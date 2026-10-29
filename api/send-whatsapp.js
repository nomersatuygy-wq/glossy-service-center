
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method tidak diizinkan"
    });
  }

  const {
    queue,
    name,
    service,
    cost
  } = req.body || {};

  if (!queue || !name || !service) {
    return res.status(400).json({
      error: "Data antrean belum lengkap"
    });
  }

  const token = process.env.WHATSAPP_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const adminPhone = process.env.ADMIN_WHATSAPP;
  const version = process.env.WHATSAPP_API_VERSION;

  if (!token || !phoneId || !adminPhone || !version) {
    return res.status(500).json({
      error: "Konfigurasi WhatsApp belum lengkap"
    });
  }

  const rupiah = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(Number(cost) || 0);

  const response = await fetch(
    `https://graph.facebook.com/${version}/${phoneId}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        recipient_type: "individual",
        to: adminPhone,
        type: "template",
        template: {
          name: "service_queue_notice",
          language: {
            code: "id"
          },
          components: [
            {
              type: "body",
              parameters: [
                { type: "text", text: String(queue) },
                { type: "text", text: String(name) },
                { type: "text", text: String(service) },
                { type: "text", text: rupiah }
              ]
            }
          ]
        }
      })
    }
  );

  const result = await response.json();

  if (!response.ok) {
    return res.status(502).json({
      error: "WhatsApp gagal mengirim pesan",
      details: result.error?.message || "Periksa konfigurasi Meta"
    });
  }

  return res.status(200).json({
    success: true,
    message: "Permintaan pesan diterima WhatsApp",
    data: result
  });
}
