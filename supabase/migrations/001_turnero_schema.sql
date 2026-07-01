-- ============================================================
-- CASA LEVEN — TURNERO MVP · Migración 001
-- Ejecutar en: https://nxtwfmpbiihpflloaldd.supabase.co
-- ============================================================

-- Espacios físicos reservables
CREATE TABLE IF NOT EXISTS spaces (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  capacity    INT NOT NULL DEFAULT 1,
  is_shared   BOOLEAN DEFAULT false,
  active      BOOLEAN DEFAULT true
);

-- Conflictos entre espacios (ej: box-4 bloquea box-4b)
CREATE TABLE IF NOT EXISTS space_conflicts (
  space_a TEXT REFERENCES spaces(id),
  space_b TEXT REFERENCES spaces(id),
  PRIMARY KEY (space_a, space_b)
);

-- Profesionales
CREATE TABLE IF NOT EXISTS professionals (
  id      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name    TEXT NOT NULL,
  role    TEXT NOT NULL,
  active  BOOLEAN DEFAULT true
);

-- Servicios individuales
CREATE TABLE IF NOT EXISTS services (
  id               TEXT PRIMARY KEY,
  name             TEXT NOT NULL,
  category         TEXT,
  duration_min     INT NOT NULL,
  space_id         TEXT REFERENCES spaces(id),
  requires_role    TEXT,
  requires_couple  BOOLEAN DEFAULT false,
  is_common        BOOLEAN DEFAULT false,
  active           BOOLEAN DEFAULT true
);

-- Circuitos (paquetes secuenciales)
CREATE TABLE IF NOT EXISTS circuits (
  id              TEXT PRIMARY KEY,
  name            TEXT NOT NULL,
  category        TEXT,
  total_min       INT,
  target_audience TEXT,
  active          BOOLEAN DEFAULT true
);

-- Pasos de cada circuito
CREATE TABLE IF NOT EXISTS circuit_steps (
  id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  circuit_id        TEXT REFERENCES circuits(id),
  step_order        INT NOT NULL,
  service_id        TEXT REFERENCES services(id),
  duration_override INT,
  UNIQUE (circuit_id, step_order)
);

-- Miembros / socios
CREATE TABLE IF NOT EXISTS members (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id     TEXT DEFAULT 'casa-leven',
  nombre        TEXT NOT NULL,
  email         TEXT UNIQUE NOT NULL,
  telefono      TEXT,
  plan          TEXT,
  estado        TEXT DEFAULT 'activo',
  fecha_inicio  DATE,
  fecha_venc    DATE,
  es_founder    BOOLEAN DEFAULT false,
  lead_id       UUID,
  created_at    TIMESTAMPTZ DEFAULT now()
);

-- Reservas
CREATE TABLE IF NOT EXISTS bookings (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tenant_id       TEXT DEFAULT 'casa-leven',
  member_id       UUID REFERENCES members(id),
  booking_type    TEXT NOT NULL CHECK (booking_type IN ('service','circuit','gym')),
  service_id      TEXT REFERENCES services(id),
  circuit_id      TEXT REFERENCES circuits(id),
  date            DATE NOT NULL,
  start_time      TIME NOT NULL,
  end_time        TIME NOT NULL,
  status          TEXT DEFAULT 'pendiente' CHECK (status IN ('pendiente','confirmado','cancelado','completado')),
  pago_estado     TEXT DEFAULT 'pendiente' CHECK (pago_estado IN ('pendiente','pagado','reembolsado')),
  pago_referencia TEXT,
  cliente_nombre  TEXT NOT NULL,
  cliente_email   TEXT NOT NULL,
  cliente_telefono TEXT NOT NULL,
  notas           TEXT,
  crm_id          TEXT,
  crm_sync_at     TIMESTAMPTZ,
  created_at      TIMESTAMPTZ DEFAULT now(),
  updated_at      TIMESTAMPTZ DEFAULT now()
);

-- Ocupación de espacios y profesionales por reserva
CREATE TABLE IF NOT EXISTS booking_slots (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id      UUID REFERENCES bookings(id) ON DELETE CASCADE,
  space_id        TEXT REFERENCES spaces(id),
  professional_id UUID REFERENCES professionals(id),
  start_time      TIMESTAMPTZ NOT NULL,
  end_time        TIMESTAMPTZ NOT NULL,
  step_order      INT
);

-- Beneficios por plan
CREATE TABLE IF NOT EXISTS membership_benefits (
  plan          TEXT NOT NULL,
  benefit_type  TEXT NOT NULL,
  quantity      INT,
  service_ids   TEXT[],
  PRIMARY KEY (plan, benefit_type)
);

-- Índices para queries de disponibilidad
CREATE INDEX IF NOT EXISTS idx_booking_slots_space   ON booking_slots(space_id, start_time, end_time);
CREATE INDEX IF NOT EXISTS idx_booking_slots_prof    ON booking_slots(professional_id, start_time, end_time);
CREATE INDEX IF NOT EXISTS idx_bookings_date         ON bookings(date, status);
CREATE INDEX IF NOT EXISTS idx_bookings_email        ON bookings(cliente_email);

-- updated_at automático
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================================
-- SEED DATA
-- ============================================================

-- Espacios
INSERT INTO spaces (id, name, capacity, is_shared) VALUES
  ('box-1',          'Consultorio Médico A',      1, false),
  ('box-2a',         'Camilla A',                 1, false),
  ('box-2b',         'Camilla B',                 1, false),
  ('box-2c',         'Camilla C',                 1, false),
  ('box-3',          'Cápsula Ozono/Infrarrojo',  1, false),
  ('box-4',          'Sala Fangoterapia',          1, false),
  ('box-4b',         'Sendero Kneipp',             1, false),
  ('box-5',          'Sala Masajes',               2, false),
  ('box-6',          'Consultorio Médico B',       1, false),
  ('sauna',          'Sauna Seco',                 8, true),
  ('ducha-escocesa', 'Ducha Escocesa',             4, true),
  ('bano-vapor',     'Baño de Vapor',              6, true),
  ('sala-relax',     'Sala Relax',                20, true),
  ('pileta',         'Pileta Climatizada',        15, true)
ON CONFLICT (id) DO NOTHING;

-- Conflicto box-4 / box-4b
INSERT INTO space_conflicts (space_a, space_b) VALUES
  ('box-4', 'box-4b')
ON CONFLICT DO NOTHING;

-- Servicios
INSERT INTO services (id, name, category, duration_min, space_id, requires_role, is_common) VALUES
  ('masaje-relajante-50',    'Masaje Relajante 50min',       'masaje',   50, 'box-5',  'masajista',    false),
  ('masaje-relajante-30',    'Masaje Relajante 30min',       'masaje',   30, 'box-5',  'masajista',    false),
  ('masaje-descontracturante','Masaje Descontracturante',    'masaje',   50, 'box-5',  'masajista',    false),
  ('masaje-circulatorio',    'Masaje Circulatorio',          'masaje',   75, 'box-5',  'masajista',    false),
  ('drenaje-linfatico',      'Drenaje Linfático',            'masaje',   50, 'box-5',  'masajista',    false),
  ('reflexologia',           'Reflexología',                 'masaje',   40, 'box-5',  'masajista',    false),
  ('reiki',                  'Reiki',                        'masaje',   40, 'box-5',  'masajista',    false),
  ('facial-a',               'Facial A',                     'facial',   60, 'box-2a', 'esteticista',  false),
  ('facial-b',               'Facial B',                     'facial',   75, 'box-2a', 'esteticista',  false),
  ('facial-c',               'Facial C',                     'facial',   60, 'box-2a', 'esteticista',  false),
  ('fisioterapia',           'Fisioterapia',                 'medico',   45, 'box-2a', 'fisioterapeuta',false),
  ('consulta-medica-20',     'Consulta Médica 20min',        'medico',   20, 'box-1',  'medico',       false),
  ('consulta-medica-40',     'Consulta Médica 40min',        'medico',   40, 'box-1',  'medico',       false),
  ('ozono',                  'Cápsula Ozono/Infrarrojo',     'especial', 45, 'box-3',  'tecnico',      false),
  ('hipnosis',               'Hipnosis (Obesidad)',          'especial', 90, 'box-1',  'especialista', false),
  ('sauna-libre',            'Sauna Seco',                   'termal',   30, 'sauna',  null,           true),
  ('vapor-libre',            'Baño de Vapor',                'termal',   20, 'bano-vapor', null,       true),
  ('kneipp-libre',           'Sendero Kneipp',               'termal',   20, 'box-4b', null,           false),
  ('fangoterapia',           'Fangoterapia',                 'termal',   30, 'box-4',  'tecnico',      false),
  ('hidromasaje',            'Hidromasaje',                  'termal',   30, 'pileta', null,           true),
  ('relax-libre',            'Sala Relax',                   'termal',   30, 'sala-relax', null,        true)
ON CONFLICT (id) DO NOTHING;

-- Circuitos Hugo Termal
INSERT INTO circuits (id, name, category, total_min, target_audience) VALUES
  ('hugo-a',          'Programa A — Wellness Básico',          'hugo-termal',    90, 'ABC1 Básico'),
  ('hugo-b',          'Programa B — Wellness + Facial',        'hugo-termal',   110, 'ABC1 Premium'),
  ('hugo-c',          'Programa C — Fango + Kneipp',           'hugo-termal',   140, 'Detox'),
  ('hugo-full',       'Circuito Full Wellness',                'hugo-termal',   290, 'Experiencia completa'),
  ('hugo-circulatorio','Circuito Circulatorio',                'hugo-termal',   135, 'Circulación'),
  ('hugo-respiratorio','Circuito Respiratorio',                'hugo-termal',   140, 'Respiratorio'),
  ('hugo-funcional',  'Reeducación Funcional',                 'hugo-termal',   110, 'Rehabilitación'),
  ('hugo-deportivo',  'Máxima Recuperación Deportiva',         'hugo-termal',   135, 'Deportistas'),
  ('gabriela-a',      'Circuito A — Termal Básico',            'gabriela-estetica', 60, 'Introductorio'),
  ('gabriela-b',      'Circuito B — Termal + Exfoliación',     'gabriela-estetica', 90, 'Piel'),
  ('gabriela-c',      'Circuito C — Termal + Hidromasaje',     'gabriela-estetica',150, 'Relajación'),
  ('gabriela-d',      'Circuito D — Termal + Presoterapia',    'gabriela-estetica',180, 'Drenaje')
ON CONFLICT (id) DO NOTHING;

-- Pasos circuito hugo-a: Sauna(20) → Kneipp(20) → Masaje(20) → Relax(30)
INSERT INTO circuit_steps (circuit_id, step_order, service_id, duration_override) VALUES
  ('hugo-a', 1, 'sauna-libre',           20),
  ('hugo-a', 2, 'kneipp-libre',          20),
  ('hugo-a', 3, 'masaje-relajante-30',   20),
  ('hugo-a', 4, 'relax-libre',           30)
ON CONFLICT (circuit_id, step_order) DO NOTHING;

-- Pasos gabriela-a: Sauna(20) → Vapor(20) → Relax(20)
INSERT INTO circuit_steps (circuit_id, step_order, service_id, duration_override) VALUES
  ('gabriela-a', 1, 'sauna-libre',  20),
  ('gabriela-a', 2, 'vapor-libre',  20),
  ('gabriela-a', 3, 'relax-libre',  20)
ON CONFLICT (circuit_id, step_order) DO NOTHING;

-- Beneficios por plan
INSERT INTO membership_benefits (plan, benefit_type, quantity) VALUES
  ('STARTER',     'gym_acceso',          null),
  ('FLOW',        'gym_acceso',          null),
  ('FLOW',        'sauna_acceso',        null),
  ('FLOW',        'consulta_nutri_mes',  1),
  ('SPORT',       'gym_acceso',          null),
  ('SPORT',       'sauna_acceso',        null),
  ('SPORT',       'circuito_hidrico_mes',4),
  ('SPORT',       'sesion_tecnica_mes',  4),
  ('POWER_SPORT', 'gym_acceso',          null),
  ('POWER_SPORT', 'sauna_acceso',        null),
  ('POWER_SPORT', 'circuito_hidrico_mes',4),
  ('POWER_SPORT', 'consulta_nutri_mes',  1),
  ('POWER_SPORT', 'sesion_tecnica_mes',  4)
ON CONFLICT (plan, benefit_type) DO NOTHING;
