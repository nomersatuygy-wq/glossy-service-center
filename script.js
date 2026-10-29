<!DOCTYPE html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Glosy Service Center</title>
    <meta
      name="description"
      content="Aplikasi jasa service dengan sistem antrean, CRUD, suara panggilan, struk pembayaran, dan chat admin WA."
    />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div class="page-shell">
      <header class="topbar">
        <div class="brand-wrap">
          <div class="brand-mark">G</div>
          <div>
            <p class="eyebrow">Service Center</p>
            <h1>Glosy Service</h1>
          </div>
        </div>

        <div class="topbar-actions">
          <button class="secondary-btn" id="callNextBtn" type="button">
            Panggil Antrean
          </button>
          <a
            class="wa-btn"
            href="https://wa.me/628170722289?text=Halo%20admin%20Glosy%20Service%20Center%2C%20saya%20ingin%20bertanya%20mengenai%20jasa%20service."
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatsApp Admin
          </a>
        </div>
      </header>

      <main>
        <section class="hero card-glass">
          <div class="hero-copy">
            <span class="badge">Fast • Reliable • Glossy</span>
            <h2>Jasa Service Cepat dengan Sistem Antrean Modern</h2>
            <p>
              Booking layanan kini lebih mudah. Pilih jenis service, kirim data
              pelanggan, lalu tunggu nomor antrean Anda dipanggil secara
              otomatis dengan suara dan alarm.
            </p>

            <div class="hero-stats">
              <div>
                <strong id="queueTotal">0</strong>
                <span>Antrean</span>
              </div>
              <div>
                <strong id="todayIncome">Rp 0</strong>
                <span>Pendapatan</span>
              </div>
              <div>
                <strong>3</strong>
                <span>Layanan</span>
              </div>
            </div>
          </div>

          <div class="hero-ticket card-glow">
            <p>Nomor Antrean Saat Ini</p>
            <div id="currentQueueBadge" class="current-badge">A-001</div>
            <small id="queueStatusText">Belum ada antrean</small>
          </div>
        </section>

        <section class="service-grid">
          <article
            class="service-card card-glass active-service"
            data-service-id="detailing"
          >
            <div class="icon-wrap">🚗</div>
            <h3>Detailing Mobil</h3>
            <p>
              Polishing, wax, dan perawatan body mobil agar kilau seperti baru.
            </p>
            <div class="service-meta">
              <span>Mulai Rp 350.000</span>
              <small>2-3 Jam</small>
            </div>
          </article>

          <article class="service-card card-glass" data-service-id="gadget">
            <div class="icon-wrap">📱</div>
            <h3>Service Gadget</h3>
            <p>
              Perbaikan layar, baterai, speaker, serta pengecekan hardware
              smartphone.
            </p>
            <div class="service-meta">
              <span>Mulai Rp 150.000</span>
              <small>1-2 Jam</small>
            </div>
          </article>

          <article class="service-card card-glass" data-service-id="ac">
            <div class="icon-wrap">❄️</div>
            <h3>Service AC</h3>
            <p>
              Diagnosa AC, pengisian freon, dan perawatan pendingin ruangan
              rumah/gedung.
            </p>
            <div class="service-meta">
              <span>Mulai Rp 250.000</span>
              <small>1-3 Jam</small>
            </div>
          </article>
        </section>

        <section class="content-grid">
          <div class="form-panel card-glass">
            <div class="panel-header">
              <h3>Form Booking Service</h3>
              <span id="formModeLabel">Tambah data</span>
            </div>

            <form id="serviceForm">
              <input type="hidden" id="queueId" />

              <div class="form-row two-col">
                <label>
                  Nama Pelanggan
                  <input
                    type="text"
                    id="customerName"
                    placeholder="Masukkan nama"
                    required
                  />
                </label>

                <label>
                  No. HP / WhatsApp
                  <input type="tel" id="phone" placeholder="08xxx" required />
                </label>
              </div>

              <div class="form-row two-col">
                <label>
                  Jenis Layanan
                  <select id="serviceType" required>
                    <option value="detailing">Detailing Mobil</option>
                    <option value="gadget">Service Gadget</option>
                    <option value="ac">Service AC</option>
                  </select>
                </label>

                <label>
                  Biaya Estimasi
                  <input
                    type="number"
                    id="price"
                    min="0"
                    step="1000"
                    placeholder="300000"
                    required
                  />
                </label>
              </div>

              <label>
                Keluhan / Detail Service
                <textarea
                  id="issue"
                  rows="4"
                  placeholder="Ceritakan keluhan atau kebutuhan service"
                  required
                ></textarea>
              </label>

              <div class="form-actions">
                <button type="submit" class="primary-btn" id="submitBtn">
                  Simpan Antrean
                </button>
                <button type="button" class="ghost-btn" id="cancelEditBtn">
                  Batal Edit
                </button>
              </div>
            </form>
          </div>

          <div class="list-panel card-glass">
            <div class="panel-header">
              <h3>Daftar Antrean</h3>
              <button type="button" class="secondary-btn small-btn" id="resetQueueBtn">
                Reset Semua
              </button>
            </div>

            <div class="queue-summary">
              <span>Menunggu: <strong id="waitingCount">0</strong></span>
              <span>Dipanggil: <strong id="calledCount">0</strong></span>
              <span>Selesai: <strong id="doneCount">0</strong></span>
            </div>

            <div class="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Nama</th>
                    <th>Service</th>
                    <th>Biaya</th>
                    <th>Status</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody id="queueTableBody"></tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>

    <div id="receiptModal" class="modal hidden" aria-hidden="true">
      <div class="modal-card card-glass">
        <div class="modal-header">
          <h3>Struk Biaya</h3>
          <button type="button" class="close-btn" id="closeReceiptBtn">×</button>
        </div>

        <div id="receiptContent" class="receipt-content"></div>

        <div class="modal-actions">
          <button type="button" class="primary-btn" id="printReceiptBtn">
            Cetak / Print
          </button>
          <button type="button" class="ghost-btn" id="closeReceiptSecondaryBtn">
            Tutup
          </button>
        </div>
      </div>
    </div>

    <script src="script.js"></script>
  </body>
</html>