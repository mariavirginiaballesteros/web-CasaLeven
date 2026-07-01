import { Resend } from 'resend'

const FROM = 'Casa Leven <reservas@casaleven.com>'

function getResend() {
  const key = process.env.RESEND_API_KEY
  if (!key) return null
  return new Resend(key)
}

interface ConfirmacionParams {
  bookingId: string
  nombre: string
  email: string
  servicio: string
  fecha: string
  hora: string
}

function formatFecha(dateStr: string): string {
  const [y, m, d] = dateStr.split('-')
  const months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio',
                  'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
  return `${d} de ${months[parseInt(m) - 1]} ${y}`
}

export async function sendConfirmacion(p: ConfirmacionParams) {
  const resend = getResend()
  if (!resend) return   // no API key configured yet

  const fechaLegible = formatFecha(p.fecha)

  await resend.emails.send({
    from: FROM,
    to:   p.email,
    subject: `Tu reserva en Casa Leven — ${p.servicio}`,
    html: `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Reserva confirmada</title>
</head>
<body style="margin:0;padding:0;background:#1c1519;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#f5f3ee;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#1c1519;">
    <tr>
      <td align="center" style="padding:40px 20px;">
        <table width="560" cellpadding="0" cellspacing="0" border="0" style="max-width:560px;width:100%;">
          <!-- Logo / header -->
          <tr>
            <td style="padding-bottom:40px;border-bottom:1px solid rgba(255,255,255,0.08);">
              <p style="margin:0;font-family:'Helvetica Neue',sans-serif;font-size:11px;font-weight:600;letter-spacing:0.35em;text-transform:uppercase;color:rgba(255,255,255,0.4);">
                CASA LEVEN
              </p>
            </td>
          </tr>
          <!-- Title -->
          <tr>
            <td style="padding:40px 0 24px;">
              <h1 style="margin:0;font-size:28px;font-weight:300;letter-spacing:-0.01em;color:#f5f3ee;line-height:1.2;">
                Tu reserva<br>está registrada.
              </h1>
            </td>
          </tr>
          <!-- Greeting -->
          <tr>
            <td style="padding-bottom:32px;">
              <p style="margin:0;font-size:15px;color:rgba(255,255,255,0.6);line-height:1.6;">
                Hola ${p.nombre}, recibimos tu solicitud y pronto te confirmaremos por WhatsApp.
              </p>
            </td>
          </tr>
          <!-- Details box -->
          <tr>
            <td style="background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);padding:28px 24px;margin-bottom:32px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding-bottom:16px;border-bottom:1px solid rgba(255,255,255,0.06);">
                    <p style="margin:0 0 4px;font-size:9px;letter-spacing:0.3em;text-transform:uppercase;color:rgba(255,255,255,0.3);font-weight:600;">SERVICIO</p>
                    <p style="margin:0;font-size:15px;color:#f5f3ee;">${p.servicio}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding:16px 0;border-bottom:1px solid rgba(255,255,255,0.06);">
                    <p style="margin:0 0 4px;font-size:9px;letter-spacing:0.3em;text-transform:uppercase;color:rgba(255,255,255,0.3);font-weight:600;">FECHA</p>
                    <p style="margin:0;font-size:15px;color:#f5f3ee;">${fechaLegible}</p>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top:16px;">
                    <p style="margin:0 0 4px;font-size:9px;letter-spacing:0.3em;text-transform:uppercase;color:rgba(255,255,255,0.3);font-weight:600;">HORARIO</p>
                    <p style="margin:0;font-size:15px;color:#f5f3ee;">${p.hora} hs</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- Note -->
          <tr>
            <td style="padding:32px 0;">
              <p style="margin:0;font-size:13px;color:rgba(255,255,255,0.4);line-height:1.6;">
                Si necesitás modificar o cancelar tu turno, respondé este email o escribinos por WhatsApp.
                <br><br>
                ID de reserva: <span style="font-family:monospace;color:rgba(255,255,255,0.3);">${p.bookingId.slice(0,8).toUpperCase()}</span>
              </p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding-top:32px;border-top:1px solid rgba(255,255,255,0.06);">
              <p style="margin:0;font-size:11px;color:rgba(255,255,255,0.25);letter-spacing:0.05em;">
                Casa Leven · Wellness &amp; Bienestar · Rosario, Argentina
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `.trim(),
  })
}
