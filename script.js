// =========================================================================
    // 1. STATE & DATA INITIALIZATION (5 RW: RW01 - RW05, RESIDENTS, LEDGER)
    // =========================================================================
    const INITIAL_ENDPOINT_URL = "https://script.google.com/macros/s/AKfycbzDbL4kDkMTogEXIzgJm0cKeENvjyzoPj_lZllHzp2nFNhtaKnWWLIfc8Sa2Dq2sfzK/exec";

    // Sample authentic data matching uploaded screenshot ("contoh data.jpg") + RW01-RW05 distribution
    let residentsData = [
      { id: "uuid-w001", code: "W001", name: "GEMILANG COFFE", address: "LUAR", rt: "RT01", rw: "RW01", category: "Usaha", tariff: 10000, status: "UNPAID", paidDate: "-" },
      { id: "uuid-w003", code: "W003", name: "GHOZALI COFFE", address: "LUAR", rt: "RT01", rw: "RW01", category: "Usaha", tariff: 10000, status: "PAID", paidDate: "2026-11-04" },
      { id: "uuid-w004", code: "W004", name: "WARUNG PATIGON", address: "LUAR", rt: "RT01", rw: "RW01", category: "Usaha", tariff: 10000, status: "UNPAID", paidDate: "-" },
      { id: "uuid-w005", code: "W005", name: "TOKO FADHIL", address: "LUAR", rt: "RT01", rw: "RW01", category: "Toko", tariff: 10000, status: "PAID", paidDate: "2026-11-06" },
      { id: "uuid-w006", code: "W006", name: "KASTO", address: "LUAR", rt: "RT01", rw: "RW01", category: "Rumah Tangga", tariff: 15000, status: "UNPAID", paidDate: "-" },
      { id: "uuid-w007", code: "W007", name: "ISA", address: "LUAR", rt: "RT01", rw: "RW01", category: "Rumah Tangga", tariff: 15000, status: "PENDING", paidDate: "2026-11-25" },
      { id: "uuid-w008", code: "W008", name: "MBAK DA TUGU", address: "LUAR", rt: "RT01", rw: "RW01", category: "Usaha", tariff: 10000, status: "PAID", paidDate: "2026-11-08" },
      { id: "uuid-w011", code: "W011", name: "TOKO SULKHAN", address: "LUAR", rt: "RT01", rw: "RW01", category: "Toko", tariff: 10000, status: "PAID", paidDate: "2026-11-10" },
      { id: "uuid-w015", code: "W015", name: "BALAI DESA", address: "LUAR", rt: "RT01", rw: "RW01", category: "Fasilitas Umum", tariff: 0, tariffLabel: "SEIKHLASNYA", status: "PAID", paidDate: "2026-11-02" },
      { id: "uuid-w016", code: "W016", name: "MUSHOLAH AL MABRUR", address: "JL. ERLANGGA", rt: "RT05", rw: "RW01", category: "Fasilitas Umum", tariff: 0, tariffLabel: "SEIKHLASNYA", status: "PAID", paidDate: "2026-11-03" },
      { id: "uuid-w017", code: "W017", name: "H. JAMIL", address: "JL. ERLANGGA", rt: "RT05", rw: "RW01", category: "Rumah Tangga", tariff: 10000, status: "UNPAID", paidDate: "-" },
      { id: "uuid-w018", code: "W018", name: "FATIK", address: "JL. ERLANGGA", rt: "RT05", rw: "RW01", category: "Rumah Tangga", tariff: 15000, status: "PAID", paidDate: "2026-11-12" },
      { id: "uuid-w042", code: "W042", name: "AHMAD FAUZI", address: "JL. MELATI", rt: "RT02", rw: "RW02", category: "Rumah Tangga", tariff: 10000, status: "PAID", paidDate: "2026-11-05" },
      { id: "uuid-w043", code: "W043", name: "SITI AMINAH", address: "JL. MELATI", rt: "RT02", rw: "RW02", category: "Rumah Tangga", tariff: 10000, status: "UNPAID", paidDate: "-" },
      { id: "uuid-w105", code: "W105", name: "BENGKEL MAJU JAYA", address: "JL. RAYA KETAPANGLOR", rt: "RT01", rw: "RW03", category: "Usaha", tariff: 15000, status: "PAID", paidDate: "2026-11-09" },
      { id: "uuid-w210", code: "W210", name: "HENDRA WIJAYA", address: "JL. KENANGA", rt: "RT03", rw: "RW04", category: "Rumah Tangga", tariff: 10000, status: "PENDING", paidDate: "2026-11-26" },
      { id: "uuid-w318", code: "W318", name: "WARUNG BU YATI", address: "JL. DAHLIA", rt: "RT02", rw: "RW05", category: "Usaha", tariff: 10000, status: "PAID", paidDate: "2026-11-11" }
    ];

    // Aggregate RW Summary (Total 504 Warga across 5 RW)
    const rwAggregateStats = [
      { rw: "RW01", label: "RW 01 (Krajan & Jl. Erlangga)", total: 124, paid: 106, amount: 1120000 },
      { rw: "RW02", label: "RW 02 (Melati & Tengah)", total: 108, paid: 92, amount: 960000 },
      { rw: "RW03", label: "RW 03 (Kulon & Raya)", total: 96, paid: 81, amount: 890000 },
      { rw: "RW04", label: "RW 04 (Kenanga)", total: 92, paid: 76, amount: 810000 },
      { rw: "RW05", label: "RW 05 (Dahlia & Selatan)", total: 84, paid: 71, amount: 740000 }
    ];

    // Ledger & Expenses State
    let ledgerEntries = [
      { id: "LDG-2026-089", date: "2026-11-25 14:12", type: "CREDIT", desc: "Verifikasi Iuran QRIS - W018 FATIK (RW01)", amount: 15000, actor: "admin@masdarling" },
      { id: "LDG-2026-088", date: "2026-11-22 09:30", type: "DEBIT", desc: "Pengeluaran Disetujui: BBM Armada Angkut & Karung Sampah", amount: -450000, actor: "admin@masdarling" },
      { id: "LDG-2026-087", date: "2026-11-20 16:05", type: "CREDIT", desc: "Setoran Tunai Kolektif Petugas RW 02 (18 Warga)", amount: 180000, actor: "petugas.rw0102" },
      { id: "LDG-2026-086", date: "2026-11-15 11:20", type: "DEBIT", desc: "Pengeluaran Disetujui: Perawatan Gerobak & Sarung Tangan", amount: -320000, actor: "admin@masdarling" }
    ];

    let expensesData = [
      { id: "EXP-2026-014", date: "2026-11-26", category: "Kebersihan", rw: "RW01", desc: "Pembelian 100 Kantong Trashbag Besar & Disinfektan", amount: 225000, status: "PENDING", submitter: "Petugas RW 01" },
      { id: "EXP-2026-013", date: "2026-11-22", category: "Transportasi", rw: "ALL", desc: "BBM Armada Pengangkut Sampah Minggu ke-3", amount: 450000, status: "APPROVED", submitter: "Admin Desa" },
      { id: "EXP-2026-012", date: "2026-11-15", category: "Peralatan", rw: "RW03", desc: "Las Rangka Gerobak Sampah & Sarung Tangan Kerja", amount: 320000, status: "APPROVED", submitter: "Admin Desa" }
    ];

    let auditLogs = [
      { time: "2026-11-26 14:20:05", actor: "SYSTEM_CRON", action: "SYNC_SHEETS_RECONCILE", detail: "Rekonsiliasi 504 UUID warga dengan worksheet DATA_WARGA sukses (0 mismatch)." },
      { time: "2026-11-26 11:04:19", actor: "petugas.rw0102", action: "PAYMENT_SUBMITTED", detail: "Input pembayaran W007 ISA (Rp 15.000) metode QRIS -> R2 key r2://receipts/9f8a2b.jpg" },
      { time: "2026-11-25 14:12:44", actor: "admin@masdarling", action: "PAYMENT_VERIFIED", detail: "Approve pembayaran W018 FATIK -> Ledger CREDIT +Rp 15.000" }
    ];

    let syncJobs = [
      { jobId: "JOB-9921", entity: "payments/uuid-w007", targetSheet: "PEMBAYARAN", status: "QUEUED", retries: 0, updated: "Baru saja" },
      { jobId: "JOB-9920", entity: "ledger/LDG-2026-089", targetSheet: "DASHBOARD", status: "SYNCED", retries: 0, updated: "2 menit lalu" },
      { jobId: "JOB-9919", entity: "expenses/EXP-2026-013", targetSheet: "PENGELUARAN", status: "SYNCED", retries: 1, updated: "1 jam lalu" }
    ];

    // Auth & UI State
    let currentUser = null; // { role: 'ADMIN' | 'PETUGAS', name: string, assignedRWs: string[] }
    let activeDashTab = "overview";
    let publicCurrentPage = 1;
    const publicPerPage = 10;

    // =========================================================================
    // 2. INITIALIZATION ON LOAD
    // =========================================================================
    document.addEventListener("DOMContentLoaded", () => {
      lucide.createIcons();
      renderPublicRWRecap();
      renderPublicTable();
      populatePaymentResidentSelect();
      initPublicChart();
      updateTopbarQueueBadge();
    });

    function formatRupiah(num) {
      return "Rp " + Number(num).toLocaleString("id-ID");
    }

    function showToast(title, message, type = "success") {
      const container = document.getElementById("toast-container");
      const colors = {
        success: "border-emerald-500/40 bg-navy-900 text-emerald-300",
        info: "border-cyan-500/40 bg-navy-900 text-cyan-300",
        warning: "border-amber-500/40 bg-navy-900 text-amber-300",
        error: "border-rose-500/40 bg-navy-900 text-rose-300"
      };
      const iconName = type === "success" ? "check-circle-2" : type === "error" ? "shield-alert" : type === "warning" ? "alert-triangle" : "info";

      const toast = document.createElement("div");
      toast.className = `pointer-events-auto p-4 rounded-xl border shadow-2xl backdrop-blur-xl flex items-start gap-3 transition-all duration-300 ${colors[type] || colors.info}`;
      toast.innerHTML = `
        <i data-lucide="${iconName}" class="w-5 h-5 shrink-0 mt-0.5"></i>
        <div class="text-xs">
          <p class="font-bold text-white mb-0.5">${title}</p>
          <p class="text-slate-300 leading-relaxed">${message}</p>
        </div>
      `;
      container.appendChild(toast);
      lucide.createIcons();
      setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => toast.remove(), 300);
      }, 4200);
    }

    // =========================================================================
    // 3. PUBLIC LANDING PAGE & TRANSPARANSI LOGIC
    // =========================================================================
    function toggleMobileMenu() {
      const menu = document.getElementById("mobile-nav");
      menu.classList.toggle("hidden");
    }

    function renderPublicRWRecap() {
      const container = document.getElementById("public-rw-recap-list");
      if (!container) return;

      container.innerHTML = rwAggregateStats.map(item => {
        const pct = Math.round((item.paid / item.total) * 100);
        return `
          <div class="p-3 rounded-xl bg-navy-950/70 border border-white/5">
            <div class="flex items-center justify-between text-xs mb-1.5">
              <span class="font-semibold text-white">${item.label}</span>
              <span class="font-bold text-emerald-400">${pct}% (${item.paid}/${item.total})</span>
            </div>
            <div class="w-full h-2 bg-navy-800 rounded-full overflow-hidden">
              <div class="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full" style="width: ${pct}%"></div>
            </div>
          </div>
        `;
      }).join("");
    }

    function getFilteredPublicResidents() {
      const rw = document.getElementById("pub-filter-rw").value;
      const status = document.getElementById("pub-filter-status").value;
      const search = document.getElementById("pub-filter-search").value.toLowerCase().trim();

      return residentsData.filter(r => {
        const matchRW = rw === "ALL" || r.rw === rw;
        const matchStatus = status === "ALL" || r.status === status;
        const matchSearch = !search || r.code.toLowerCase().includes(search) || r.name.toLowerCase().includes(search) || r.address.toLowerCase().includes(search);
        return matchRW && matchStatus && matchSearch;
      });
    }

    function renderPublicTable() {
      const filtered = getFilteredPublicResidents();
      const totalItems = filtered.length;
      const totalPages = Math.max(1, Math.ceil(totalItems / publicPerPage));
      if (publicCurrentPage > totalPages) publicCurrentPage = totalPages;

      const startIdx = (publicCurrentPage - 1) * publicPerPage;
      const pageItems = filtered.slice(startIdx, startIdx + publicPerPage);

      // Update mini KPI cards above table
      const paidCount = filtered.filter(x => x.status === "PAID").length;
      const unpaidCount = filtered.filter(x => x.status === "UNPAID").length;
      const pct = totalItems > 0 ? Math.round((paidCount / totalItems) * 100) : 0;

      document.getElementById("filter-card-total").textContent = `${totalItems} Sampel / 504 Warga`;
      document.getElementById("filter-card-paid").textContent = `${paidCount} Warga`;
      document.getElementById("filter-card-unpaid").textContent = `${unpaidCount} Warga`;
      document.getElementById("filter-card-percent").textContent = `${pct}%`;

      const tbody = document.getElementById("public-billing-tbody");
      if (pageItems.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="py-10 text-center text-slate-400 text-sm">Tidak ada data tagihan warga yang cocok dengan filter pencarian.</td></tr>`;
      } else {
        tbody.innerHTML = pageItems.map(r => {
          const badgeClass = r.status === "PAID" ? "badge-paid" : r.status === "PENDING" ? "badge-pending" : "badge-unpaid";
          const statusLabel = r.status === "PAID" ? "SUDAH BAYAR" : r.status === "PENDING" ? "VERIFIKASI" : "BELUM BAYAR";
          const tariffText = r.tariffLabel ? r.tariffLabel : formatRupiah(r.tariff);

          return `
            <tr class="hover:bg-white/[0.02] transition">
              <td class="py-3.5 px-5">
                <span class="block text-[11px] font-bold text-cyan-400">${r.code}</span>
                <span class="font-semibold text-white">${r.name}</span>
              </td>
              <td class="py-3.5 px-4 text-slate-300 text-xs">${r.address}</td>
              <td class="py-3.5 px-4">
                <span class="badge-rw px-2.5 py-1 rounded-md text-[11px] font-bold">${r.rt} / ${r.rw}</span>
              </td>
              <td class="py-3.5 px-4 font-semibold text-slate-200">${tariffText}</td>
              <td class="py-3.5 px-4">
                <span class="${badgeClass} px-2.5 py-1 rounded-md text-[11px] font-bold tracking-wide">${statusLabel}</span>
              </td>
              <td class="py-3.5 px-5 text-right">
                ${r.status === "PAID" 
                  ? `<button onclick="downloadReceipt('${r.code}')" class="px-3 py-1.5 rounded-lg text-xs font-semibold bg-navy-800 hover:bg-navy-700 text-emerald-300 border border-emerald-500/30 cursor-pointer">Kuitansi</button>`
                  : `<button onclick="openPaymentModal('${r.id}')" class="px-3.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-navy-950 transition cursor-pointer">Bayar</button>`
                }
              </td>
            </tr>
          `;
        }).join("");
      }

      document.getElementById("public-table-info").textContent = `Menampilkan ${pageItems.length} dari ${totalItems} data terfilter`;
      document.getElementById("public-page-indicator").textContent = `Hal ${publicCurrentPage} / ${totalPages}`;
    }

    function changePublicPage(delta) {
      publicCurrentPage = Math.max(1, publicCurrentPage + delta);
      renderPublicTable();
    }

    function initPublicChart() {
      const ctx = document.getElementById("publicCashflowChart");
      if (!ctx) return;
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Jun", "Jul", "Agu", "Sep", "Okt", "Nov"],
          datasets: [
            {
              label: "Pemasukan Terverifikasi (Rp)",
              data: [4100000, 4350000, 4280000, 4520000, 4690000, 4820000],
              backgroundColor: "#10B981",
              borderRadius: 6,
            },
            {
              label: "Pengeluaran Disetujui (Rp)",
              data: [1450000, 1620000, 1390000, 1780000, 1540000, 1650000],
              backgroundColor: "#06B6D4",
              borderRadius: 6,
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { labels: { color: "#CBD5E1", font: { size: 11 } } }
          },
          scales: {
            x: { ticks: { color: "#94A3B8" }, grid: { display: false } },
            y: { ticks: { color: "#94A3B8" }, grid: { color: "rgba(255,255,255,0.06)" } }
          }
        }
      });
    }

    // =========================================================================
    // 4. INITIAL ENDPOINT INSPECTION & SAFE IMPORT (APPS SCRIPT BRIDGE)
    // =========================================================================
    async function fetchInitialEndpointData() {
      const btn = document.getElementById("btn-sync-awal");
      btn.disabled = true;
      btn.innerHTML = `<i data-lucide="loader-2" class="w-3.5 h-3.5 animate-spin"></i><span>Menginspeksi Endpoint...</span>`;
      lucide.createIcons();

      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 6000);
        const res = await fetch(INITIAL_ENDPOINT_URL, { signal: controller.signal });
        clearTimeout(timeout);
        const rawData = await res.json();

        // Normalize response safely without assuming schema
        const records = Array.isArray(rawData) ? rawData : (rawData.data || rawData.records || []);
        if (records.length > 0) {
          showToast("Inspeksi Endpoint Berhasil", `Ditemukan ${records.length} baris dari sumber data awal. Validasi UUID & deduplikasi siap.`, "success");
          auditLogs.unshift({
            time: new Date().toISOString().replace("T", " ").slice(0, 19),
            actor: currentUser ? currentUser.name : "PUBLIC_INSPECT",
            action: "INITIAL_ENDPOINT_FETCH",
            detail: `Fetch sukses (${records.length} record) dari Apps Script awal.`
          });
        } else {
          showToast("Respons Endpoint Diterima", "Endpoint merespons tanpa baris baru atau memerlukan parameter sheet.", "info");
        }
      } catch (err) {
        showToast("Mode Offline / CORS Terproteksi", "Endpoint Apps Script terdeteksi. Gunakan Worker Bridge untuk import server-side dengan validasi HMAC.", "warning");
      } finally {
        btn.disabled = false;
        btn.innerHTML = `<i data-lucide="refresh-cw" class="w-3.5 h-3.5"></i><span>Tarik Data Endpoint Awal</span>`;
        lucide.createIcons();
      }
    }

    // =========================================================================
    // 5. PAYMENT FLOW (IDEMPOTENCY, R2 UPLOAD SIMULATION, VERIFICATION QUEUE)
    // =========================================================================
    function populatePaymentResidentSelect() {
      const sel = document.getElementById("pay-resident-select");
      if (!sel) return;
      sel.innerHTML = residentsData.map(r => `
        <option value="${r.id}" data-tariff="${r.tariff || 10000}">
          ${r.code} - ${r.name} (${r.rt}/${r.rw}) — ${r.status === 'PAID' ? 'LUNAS' : 'Tagihan ' + formatRupiah(r.tariff || 10000)}
        </option>
      `).join("");
    }

    function openPaymentModal(residentId) {
      populatePaymentResidentSelect();
      if (residentId) {
        document.getElementById("pay-resident-select").value = residentId;
      }
      updatePaymentNominal();
      openModal("modal-payment");
    }

    function updatePaymentNominal() {
      const sel = document.getElementById("pay-resident-select");
      const opt = sel.options[sel.selectedIndex];
      if (opt) {
        document.getElementById("pay-amount").value = opt.getAttribute("data-tariff") || 10000;
      }
    }

    function handlePaymentSubmit(e) {
      e.preventDefault();
      const resId = document.getElementById("pay-resident-select").value;
      const method = document.getElementById("pay-method").value;
      const amount = Number(document.getElementById("pay-amount").value);
      const resident = residentsData.find(r => r.id === resId);

      if (!resident) return;

      // Update resident status to PENDING (awaiting verification unless Admin/Petugas direct verify)
      resident.status = "PENDING";
      resident.paidDate = new Date().toISOString().slice(0, 10);

      // Enqueue Google Sheets Sync Job
      const jobId = "JOB-" + Math.floor(1000 + Math.random() * 9000);
      syncJobs.unshift({
        jobId,
        entity: `payments/${resident.code}`,
        targetSheet: "PEMBAYARAN",
        status: "QUEUED",
        retries: 0,
        updated: "Baru saja"
      });

      auditLogs.unshift({
        time: new Date().toISOString().replace("T", " ").slice(0, 19),
        actor: currentUser ? currentUser.name : `WARGA_${resident.code}`,
        action: "PAYMENT_SUBMITTED",
        detail: `Pengajuan bayar ${resident.code} (${resident.name}) ${formatRupiah(amount)} via ${method}. Antrean sync ${jobId}.`
      });

      closeModal("modal-payment");
      renderPublicTable();
      updateTopbarQueueBadge();
      if (currentUser) renderDashboardContent();

      showToast(
        "Pembayaran Terkirim (SUBMITTED)",
        `Bukti untuk ${resident.code} (${resident.name}) disimpan ke R2 dan menunggu verifikasi petugas/admin.`,
        "success"
      );
    }

    function downloadReceipt(code) {
      const r = residentsData.find(x => x.code === code);
      if (!r) return;
      showToast("Kuitansi Digital Siap", `Mengunduh kuitansi resmi PDF/HTML untuk ${r.code} - ${r.name} (${r.rt}/${r.rw}).`, "info");
    }

    function exportPublicCSV() {
      const headers = ["Wilayah_RW", "Total_Warga", "Sudah_Bayar", "Belum_Bayar", "Terkumpul_Rp"];
      const rows = rwAggregateStats.map(r => [r.rw, r.total, r.paid, r.total - r.paid, r.amount]);
      const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "Rekap_Transparansi_Masdarling_Ketapanglor_2026.csv");
      document.body.appendChild(link);
      link.click();
      link.remove();
      showToast("Ekspor CSV Berhasil", "File rekap agregat publik berhasil diunduh.", "success");
    }

    // =========================================================================
    // 6. AUTHENTICATION, RBAC & REGION ISOLATION (ADMIN VS PETUGAS RW)
    // =========================================================================
    function selectLoginRole(role) {
      document.getElementById("login-role-input").value = role;
      const btnAdmin = document.getElementById("login-tab-admin");
      const btnPetugas = document.getElementById("login-tab-petugas");
      const hint = document.getElementById("petugas-rw-hint");

      if (role === "ADMIN") {
        btnAdmin.className = "py-2 rounded-lg text-xs font-bold bg-emerald-500 text-navy-950 transition cursor-pointer";
        btnPetugas.className = "py-2 rounded-lg text-xs font-bold text-slate-400 hover:text-white transition cursor-pointer";
        document.getElementById("login-username").value = "admin@masdarling-ketapanglor.id";
        hint.classList.add("hidden");
      } else {
        btnPetugas.className = "py-2 rounded-lg text-xs font-bold bg-cyan-400 text-navy-950 transition cursor-pointer";
        btnAdmin.className = "py-2 rounded-lg text-xs font-bold text-slate-400 hover:text-white transition cursor-pointer";
        document.getElementById("login-username").value = "petugas.rw0102@masdarling-ketapanglor.id";
        hint.classList.remove("hidden");
      }
    }

    function handleLoginSubmit(e) {
      e.preventDefault();
      const role = document.getElementById("login-role-input").value;
      const username = document.getElementById("login-username").value;

      if (role === "ADMIN") {
        currentUser = {
          role: "ADMIN",
          name: "Admin Desa Ketapanglor",
          username,
          assignedRWs: ["RW01", "RW02", "RW03", "RW04", "RW05"]
        };
      } else {
        currentUser = {
          role: "PETUGAS",
          name: "Petugas Wilayah (Bpk. Hendra)",
          username,
          assignedRWs: ["RW01", "RW02"] // Strict region boundary enforced
        };
      }

      auditLogs.unshift({
        time: new Date().toISOString().replace("T", " ").slice(0, 19),
        actor: username,
        action: "AUTH_LOGIN_SUCCESS",
        detail: `Login berhasil sebagai ${currentUser.role} (${currentUser.assignedRWs.join(", ")})`
      });

      closeModal("modal-login");
      enterDashboardView();
      showToast("Autentikasi Berhasil", `Selamat datang, ${currentUser.name}. Sesi HttpOnly terenkripsi aktif.`, "success");
    }

    function enterDashboardView() {
      document.getElementById("public-view").classList.add("hidden");
      document.getElementById("dashboard-view").classList.remove("hidden");

      document.getElementById("sidebar-role-badge").textContent = currentUser.role === "ADMIN" ? "ADMIN KENDALI PENUH" : "PETUGAS RW 01 & RW 02";
      document.getElementById("user-display-name").textContent = currentUser.name;
      document.getElementById("user-display-scope").textContent = currentUser.role === "ADMIN" ? "Semua Wilayah (RW 01–05)" : "Wilayah Tugas: RW 01, RW 02";
      document.getElementById("user-avatar-initials").textContent = currentUser.role === "ADMIN" ? "AD" : "PT";

      activeDashTab = "overview";
      renderSidebarMenu();
      renderDashboardContent();
    }

    function switchToPublicView() {
      document.getElementById("dashboard-view").classList.add("hidden");
      document.getElementById("public-view").classList.remove("hidden");
      renderPublicTable();
    }

    function logoutUser() {
      auditLogs.unshift({
        time: new Date().toISOString().replace("T", " ").slice(0, 19),
        actor: currentUser ? currentUser.username : "USER",
        action: "AUTH_LOGOUT_REVOKED",
        detail: "Session token direvokasi dari D1 user_sessions."
      });
      currentUser = null;
      switchToPublicView();
      showToast("Logout Berhasil", "Sesi Anda telah diakhiri dengan aman.", "info");
    }

    function toggleDashSidebar() {
      const sb = document.getElementById("dash-sidebar");
      sb.classList.toggle("-translate-x-full");
    }

    function renderSidebarMenu() {
      const adminMenus = [
        { id: "overview", label: "Overview Keuangan", icon: "layout-dashboard" },
        { id: "residents", label: "Data Warga (5 RW)", icon: "users" },
        { id: "payments", label: "Verifikasi Pembayaran", icon: "badge-check" },
        { id: "expenses", label: "Pengeluaran & Approval", icon: "receipt" },
        { id: "ledger", label: "Buku Besar (Ledger)", icon: "book-lock" },
        { id: "sheets-sync", label: "Google Sheets Sync", icon: "sheet" },
        { id: "audit", label: "Audit Log & Keamanan", icon: "shield-alert" }
      ];

      const petugasMenus = [
        { id: "overview", label: "Ringkasan Wilayah Tugas", icon: "layout-dashboard" },
        { id: "residents", label: "Warga RW 01 & RW 02", icon: "users" },
        { id: "payments", label: "Setoran & Verifikasi RW", icon: "badge-check" },
        { id: "expenses", label: "Ajukan Pengeluaran RW", icon: "receipt" }
      ];

      const menus = currentUser.role === "ADMIN" ? adminMenus : petugasMenus;
      const container = document.getElementById("sidebar-menu-container");

      container.innerHTML = menus.map(m => {
        const active = activeDashTab === m.id;
        return `
          <button onclick="setDashTab('${m.id}')" class="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-medium transition cursor-pointer ${
            active ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30" : "text-slate-400 hover:text-white hover:bg-white/5"
          }">
            <i data-lucide="${m.icon}" class="w-4 h-4 ${active ? 'text-emerald-400' : ''}"></i>
            <span>${m.label}</span>
          </button>
        `;
      }).join("");
      lucide.createIcons();
    }

    function setDashTab(tabId) {
      activeDashTab = tabId;
      document.getElementById("dash-breadcrumb").textContent = tabId.toUpperCase();
      renderSidebarMenu();
      renderDashboardContent();
    }

    function updateTopbarQueueBadge() {
      const pending = syncJobs.filter(j => j.status !== "SYNCED").length;
      const el = document.getElementById("topbar-queue-count");
      if (el) el.textContent = `${pending} Pending`;
    }

    // =========================================================================
    // 7. DASHBOARD VIEWS RENDERING (REGION-GUARDED DATA)
    // =========================================================================
    function getAuthorizedResidents() {
      if (!currentUser) return [];
      // Backend-style strict region filter
      return residentsData.filter(r => currentUser.assignedRWs.includes(r.rw));
    }

    function renderDashboardContent() {
      const main = document.getElementById("dash-main-content");
      const authResidents = getAuthorizedResidents();
      const pendingPayments = authResidents.filter(r => r.status === "PENDING");
      const paidResidents = authResidents.filter(r => r.status === "PAID");

      if (activeDashTab === "overview") {
        main.innerHTML = `
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 class="font-display font-extrabold text-2xl text-white">
                ${currentUser.role === "ADMIN" ? "Dashboard Utama Keuangan Desa" : "Dashboard Operasional Petugas (RW 01 & RW 02)"}
              </h1>
              <p class="text-xs text-slate-400 mt-1">
                ${currentUser.role === "ADMIN" 
                  ? "Kendali penuh seluruh transaksi 5 RW, buku besar immutable, dan sinkronisasi Google Sheets." 
                  : "Otorisasi dibatasi hanya pada wilayah RW 01 dan RW 02 sesuai assignment Admin."}
              </p>
            </div>
            <div class="flex flex-wrap gap-2.5">
              <button onclick="openPaymentModal(null)" class="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-navy-950 flex items-center gap-1.5 cursor-pointer">
                <i data-lucide="plus-circle" class="w-4 h-4"></i>
                <span>Catat Pembayaran</span>
              </button>
              ${currentUser.role === "ADMIN" ? `
                <button onclick="triggerManualSheetsSync()" class="px-4 py-2 rounded-xl text-xs font-semibold bg-navy-800 hover:bg-navy-700 text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5 cursor-pointer">
                  <i data-lucide="refresh-cw" class="w-3.5 h-3.5"></i>
                  <span>Sync Sheets Sekarang</span>
                </button>
              ` : ""}
            </div>
          </div>

          <!-- KPI Grid -->
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div class="fin-card-emerald rounded-2xl p-5">
              <p class="text-xs text-emerald-200/80">Saldo Kas Resmi (Ledger)</p>
              <p class="font-display font-extrabold text-2xl text-white mt-1">Rp 18.450.000</p>
              <p class="text-[11px] text-emerald-300 mt-1">Append-Only Verified</p>
            </div>
            <div class="fin-card rounded-2xl p-5">
              <p class="text-xs text-slate-400">Warga Wilayah Akses</p>
              <p class="font-display font-extrabold text-2xl text-white mt-1">${authResidents.length} Sampel Aktif</p>
              <p class="text-[11px] text-cyan-400 mt-1">Scope: ${currentUser.assignedRWs.join(", ")}</p>
            </div>
            <div class="fin-card rounded-2xl p-5">
              <p class="text-xs text-slate-400">Menunggu Verifikasi</p>
              <p class="font-display font-extrabold text-2xl text-amber-400 mt-1">${pendingPayments.length} Transaksi</p>
              <p class="text-[11px] text-amber-300/80 mt-1">Perlu approval bukti R2</p>
            </div>
            <div class="fin-card rounded-2xl p-5">
              <p class="text-xs text-slate-400">Sudah Lunas (Sampel)</p>
              <p class="font-display font-extrabold text-2xl text-emerald-400 mt-1">${paidResidents.length} Warga</p>
              <p class="text-[11px] text-slate-400 mt-1">Tercatat di D1 Invoices</p>
            </div>
          </div>

          <!-- Pending Verification Quick Table -->
          <div class="fin-card rounded-2xl p-6">
            <div class="flex items-center justify-between mb-4">
              <div>
                <h2 class="font-display font-bold text-base text-white">Antrean Verifikasi Pembayaran</h2>
                <p class="text-xs text-slate-400">Setujui pembayaran untuk memperbarui Invoice & menambah entri CREDIT pada Ledger</p>
              </div>
              <span class="badge-pending px-2.5 py-1 rounded-lg text-xs font-bold">${pendingPayments.length} Pending</span>
            </div>
            ${renderVerificationTableHTML(pendingPayments)}
          </div>
        `;
      } else if (activeDashTab === "residents") {
        main.innerHTML = `
          <div class="flex items-center justify-between">
            <div>
              <h1 class="font-display font-extrabold text-xl text-white">Data Warga (${currentUser.assignedRWs.join(", ")})</h1>
              <p class="text-xs text-slate-400">Hanya menampilkan data warga sesuai hak akses wilayah Anda</p>
            </div>
            <button onclick="openPaymentModal(null)" class="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 text-navy-950 cursor-pointer">+ Input Pembayaran</button>
          </div>
          <div class="fin-card rounded-2xl overflow-hidden">
            <div class="overflow-x-auto">
              <table class="w-full text-left border-collapse text-sm">
                <thead>
                  <tr class="border-b border-white/10 bg-navy-950/70 text-[11px] font-bold uppercase text-slate-400">
                    <th class="py-3.5 px-5">Kode / Nama</th>
                    <th class="py-3.5 px-4">Alamat</th>
                    <th class="py-3.5 px-4">RT / RW</th>
                    <th class="py-3.5 px-4">Kategori</th>
                    <th class="py-3.5 px-4">Tarif</th>
                    <th class="py-3.5 px-4">Status</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-white/5">
                  ${authResidents.map(r => `
                    <tr class="hover:bg-white/[0.02]">
                      <td class="py-3 px-5"><span class="text-cyan-400 text-xs font-bold block">${r.code}</span><span class="text-white font-semibold">${r.name}</span></td>
                      <td class="py-3 px-4 text-xs text-slate-300">${r.address}</td>
                      <td class="py-3 px-4"><span class="badge-rw px-2 py-0.5 rounded text-xs font-bold">${r.rt}/${r.rw}</span></td>
                      <td class="py-3 px-4 text-xs text-slate-300">${r.category}</td>
                      <td class="py-3 px-4 font-semibold text-white">${r.tariffLabel || formatRupiah(r.tariff)}</td>
                      <td class="py-3 px-4"><span class="${r.status === 'PAID' ? 'badge-paid' : r.status === 'PENDING' ? 'badge-pending' : 'badge-unpaid'} px-2.5 py-0.5 rounded text-xs font-bold">${r.status}</span></td>
                    </tr>
                  `).join("")}
                </tbody>
              </table>
            </div>
          </div>
        `;
      } else if (activeDashTab === "payments") {
        main.innerHTML = `
          <div>
            <h1 class="font-display font-extrabold text-xl text-white">Verifikasi Transaksi & Bukti R2</h1>
            <p class="text-xs text-slate-400">Transaksi terverifikasi tidak dapat dihapus permanen; koreksi wajib melalui reversal ledger.</p>
          </div>
          <div class="fin-card rounded-2xl p-6">
            ${renderVerificationTableHTML(pendingPayments)}
          </div>
        `;
      } else if (activeDashTab === "expenses") {
        main.innerHTML = `
          <div class="flex items-center justify-between">
            <div>
              <h1 class="font-display font-extrabold text-xl text-white">Pengeluaran Operasional & Approval</h1>
              <p class="text-xs text-slate-400">Pengeluaran baru mengurangi saldo kas resmi setelah disetujui oleh Admin.</p>
            </div>
            <button onclick="simulateNewExpense()" class="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 text-navy-950 cursor-pointer">+ Ajukan Pengeluaran</button>
          </div>
          <div class="fin-card rounded-2xl overflow-hidden">
            <table class="w-full text-left text-sm">
              <thead>
                <tr class="border-b border-white/10 bg-navy-950/70 text-[11px] font-bold uppercase text-slate-400">
                  <th class="py-3.5 px-5">Nomor / Tanggal</th>
                  <th class="py-3.5 px-4">Kategori & Wilayah</th>
                  <th class="py-3.5 px-4">Keterangan</th>
                  <th class="py-3.5 px-4">Nominal</th>
                  <th class="py-3.5 px-4">Status</th>
                  <th class="py-3.5 px-5 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-white/5">
                ${expensesData.map(ex => `
                  <tr>
                    <td class="py-3.5 px-5"><span class="text-xs font-bold text-cyan-400 block">${ex.id}</span><span class="text-xs text-slate-400">${ex.date}</span></td>
                    <td class="py-3.5 px-4 text-xs text-white font-semibold">${ex.category} (${ex.rw})</td>
                    <td class="py-3.5 px-4 text-xs text-slate-300">${ex.desc}</td>
                    <td class="py-3.5 px-4 font-bold text-amber-300">${formatRupiah(ex.amount)}</td>
                    <td class="py-3.5 px-4"><span class="${ex.status === 'APPROVED' ? 'badge-paid' : 'badge-pending'} px-2.5 py-0.5 rounded text-xs font-bold">${ex.status}</span></td>
                    <td class="py-3.5 px-5 text-right">
                      ${ex.status === "PENDING" && currentUser.role === "ADMIN" 
                        ? `<button onclick="approveExpense('${ex.id}')" class="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-500 text-navy-950 cursor-pointer">Setujui</button>`
                        : `<span class="text-xs text-slate-500">${ex.status === 'APPROVED' ? 'Tercatat di Ledger' : 'Menunggu Admin'}</span>`}
                    </td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        `;
      } else if (activeDashTab === "ledger") {
        main.innerHTML = `
          <div>
            <h1 class="font-display font-extrabold text-xl text-white">Immutable Financial Ledger (Append-Only)</h1>
            <p class="text-xs text-slate-400">Buku besar kas resmi. Tidak ada fitur hapus permanen; setiap perubahan tercatat dengan aktor dan timestamp.</p>
          </div>
          <div class="fin-card rounded-2xl overflow-hidden">
            <table class="w-full text-left text-sm">
              <thead>
                <tr class="border-b border-white/10 bg-navy-950/70 text-[11px] font-bold uppercase text-slate-400">
                  <th class="py-3.5 px-5">ID Entri</th>
                  <th class="py-3.5 px-4">Waktu</th>
                  <th class="py-3.5 px-4">Tipe</th>
                  <th class="py-3.5 px-4">Deskripsi Transaksi</th>
                  <th class="py-3.5 px-4">Nominal</th>
                  <th class="py-3.5 px-5">Aktor</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-white/5">
                ${ledgerEntries.map(l => `
                  <tr>
                    <td class="py-3.5 px-5 font-mono text-xs text-cyan-400">${l.id}</td>
                    <td class="py-3.5 px-4 text-xs text-slate-400">${l.date}</td>
                    <td class="py-3.5 px-4"><span class="${l.type === 'CREDIT' ? 'badge-paid' : 'badge-unpaid'} px-2 py-0.5 rounded text-xs font-bold">${l.type}</span></td>
                    <td class="py-3.5 px-4 text-xs text-white">${l.desc}</td>
                    <td class="py-3.5 px-4 font-bold ${l.amount >= 0 ? 'text-emerald-400' : 'text-rose-400'}">${l.amount >= 0 ? '+' : ''}${formatRupiah(l.amount)}</td>
                    <td class="py-3.5 px-5 text-xs text-slate-400">${l.actor}</td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        `;
      } else if (activeDashTab === "sheets-sync") {
        main.innerHTML = `
          <div class="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h1 class="font-display font-extrabold text-xl text-white">Google Sheets Sync & Reconciliation</h1>
              <p class="text-xs text-slate-400">Spreadsheet: <strong>MASDARLING KETAPANGLOR - DATA KEUANGAN</strong> (D1 sebagai Source of Truth)</p>
            </div>
            <button onclick="triggerManualSheetsSync()" class="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 text-navy-950 flex items-center gap-2 cursor-pointer">
              <i data-lucide="refresh-cw" class="w-4 h-4"></i>
              <span>Jalankan Queue & Reconcile</span>
            </button>
          </div>
          <div class="fin-card rounded-2xl overflow-hidden">
            <table class="w-full text-left text-sm">
              <thead>
                <tr class="border-b border-white/10 bg-navy-950/70 text-[11px] font-bold uppercase text-slate-400">
                  <th class="py-3.5 px-5">Job ID</th>
                  <th class="py-3.5 px-4">Entity UUID</th>
                  <th class="py-3.5 px-4">Target Worksheet</th>
                  <th class="py-3.5 px-4">Status Queue</th>
                  <th class="py-3.5 px-4">Retry</th>
                  <th class="py-3.5 px-5">Pembaruan</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-white/5">
                ${syncJobs.map(j => `
                  <tr>
                    <td class="py-3.5 px-5 font-mono text-xs text-cyan-400">${j.jobId}</td>
                    <td class="py-3.5 px-4 text-xs text-white">${j.entity}</td>
                    <td class="py-3.5 px-4"><span class="badge-rw px-2 py-0.5 rounded text-xs font-bold">${j.targetSheet}</span></td>
                    <td class="py-3.5 px-4"><span class="${j.status === 'SYNCED' ? 'badge-paid' : 'badge-pending'} px-2.5 py-0.5 rounded text-xs font-bold">${j.status}</span></td>
                    <td class="py-3.5 px-4 text-xs text-slate-300">${j.retries}x</td>
                    <td class="py-3.5 px-5 text-xs text-slate-400">${j.updated}</td>
                  </tr>
                `).join("")}
              </tbody>
            </table>
          </div>
        `;
      } else if (activeDashTab === "audit") {
        main.innerHTML = `
          <div>
            <h1 class="font-display font-extrabold text-xl text-white">Audit Log & Security Trail (Append-Only)</h1>
            <p class="text-xs text-slate-400">Seluruh aktivitas autentikasi, perubahan status tagihan, approval pengeluaran, dan sinkronisasi tercatat permanen.</p>
          </div>
          <div class="fin-card rounded-2xl p-5 space-y-3">
            ${auditLogs.map(log => `
              <div class="p-3.5 rounded-xl bg-navy-950/80 border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div>
                  <span class="font-bold text-emerald-400 mr-2">[${log.action}]</span>
                  <span class="text-white">${log.detail}</span>
                </div>
                <div class="text-slate-500 shrink-0 font-mono text-[11px]">${log.actor} • ${log.time}</div>
              </div>
            `).join("")}
          </div>
        `;
      }

      lucide.createIcons();
    }

    function renderVerificationTableHTML(list) {
      if (list.length === 0) {
        return `<p class="text-xs text-slate-400 py-4">Tidak ada pembayaran berstatus PENDING pada wilayah akses Anda saat ini.</p>`;
      }
      return `
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm">
            <thead>
              <tr class="border-b border-white/10 text-[11px] font-bold uppercase text-slate-400">
                <th class="py-3 px-4">Warga</th>
                <th class="py-3 px-4">Wilayah</th>
                <th class="py-3 px-4">Nominal</th>
                <th class="py-3 px-4">Tanggal Ajuan</th>
                <th class="py-3 px-4 text-right">Keputusan Verifikator</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-white/5">
              ${list.map(r => `
                <tr>
                  <td class="py-3 px-4 font-semibold text-white">${r.code} - ${r.name}</td>
                  <td class="py-3 px-4"><span class="badge-rw px-2 py-0.5 rounded text-xs font-bold">${r.rt}/${r.rw}</span></td>
                  <td class="py-3 px-4 font-bold text-emerald-400">${formatRupiah(r.tariff || 10000)}</td>
                  <td class="py-3 px-4 text-xs text-slate-400">${r.paidDate}</td>
                  <td class="py-3 px-4 text-right space-x-2">
                    <button onclick="verifyResidentPayment('${r.id}', true)" class="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-500 hover:bg-emerald-400 text-navy-950 cursor-pointer">Approve</button>
                    <button onclick="verifyResidentPayment('${r.id}', false)" class="px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/30 cursor-pointer">Tolak</button>
                  </td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        </div>
      `;
    }

    function verifyResidentPayment(resId, isApproved) {
      const r = residentsData.find(x => x.id === resId);
      if (!r) return;

      // Backend-style region check
      if (!currentUser.assignedRWs.includes(r.rw)) {
        showToast("Akses Ditolak (403 Forbidden)", `Anda tidak memiliki otorisasi untuk wilayah ${r.rw}.`, "error");
        return;
      }

      if (isApproved) {
        r.status = "PAID";
        const nominal = r.tariff || 10000;
        ledgerEntries.unshift({
          id: "LDG-2026-" + Math.floor(100 + Math.random() * 899),
          date: new Date().toISOString().replace("T", " ").slice(0, 16),
          type: "CREDIT",
          desc: `Verifikasi Iuran - ${r.code} ${r.name} (${r.rw})`,
          amount: nominal,
          actor: currentUser.username
        });
        showToast("Pembayaran Diverifikasi", `Status ${r.code} menjadi PAID dan saldo kas resmi bertambah ${formatRupiah(nominal)}.`, "success");
      } else {
        r.status = "UNPAID";
        showToast("Pembayaran Ditolak", `Pengajuan ${r.code} dikembalikan ke status UNPAID.`, "warning");
      }

      auditLogs.unshift({
        time: new Date().toISOString().replace("T", " ").slice(0, 19),
        actor: currentUser.username,
        action: isApproved ? "PAYMENT_VERIFIED" : "PAYMENT_REJECTED",
        detail: `${isApproved ? 'Approve' : 'Reject'} pembayaran ${r.code} (${r.rw})`
      });

      renderDashboardContent();
    }

    function simulateNewExpense() {
      const id = "EXP-2026-0" + Math.floor(15 + Math.random() * 80);
      expensesData.unshift({
        id,
        date: new Date().toISOString().slice(0, 10),
        category: "Operasional",
        rw: currentUser.assignedRWs[0],
        desc: "Pengadaan Alat Kebersihan & Sapu Lidi Wilayah",
        amount: 150000,
        status: currentUser.role === "ADMIN" ? "APPROVED" : "PENDING",
        submitter: currentUser.name
      });
      showToast("Pengeluaran Dicatat", `${id} berhasil diajukan (${currentUser.role === 'ADMIN' ? 'Langsung Disetujui' : 'Menunggu Approval Admin'}).`, "info");
      renderDashboardContent();
    }

    function approveExpense(expId) {
      if (currentUser.role !== "ADMIN") {
        showToast("Akses Ditolak", "Hanya ADMIN yang berhak menyetujui pengeluaran resmi.", "error");
        return;
      }
      const ex = expensesData.find(x => x.id === expId);
      if (!ex) return;
      ex.status = "APPROVED";
      ledgerEntries.unshift({
        id: "LDG-2026-" + Math.floor(100 + Math.random() * 899),
        date: new Date().toISOString().replace("T", " ").slice(0, 16),
        type: "DEBIT",
        desc: `Pengeluaran Disetujui (${ex.id}): ${ex.desc}`,
        amount: -ex.amount,
        actor: currentUser.username
      });
      showToast("Pengeluaran Disetujui", `${ex.id} telah masuk ke Ledger DEBIT.`, "success");
      renderDashboardContent();
    }

    function triggerManualSheetsSync() {
      syncJobs.forEach(j => { j.status = "SYNCED"; j.updated = "Baru saja"; });
      updateTopbarQueueBadge();
      auditLogs.unshift({
        time: new Date().toISOString().replace("T", " ").slice(0, 19),
        actor: currentUser.username,
        action: "SHEETS_QUEUE_FLUSHED",
        detail: "Seluruh antrean berhasil di-upsert ke Google Sheets MASDARLING KETAPANGLOR."
      });
      renderDashboardContent();
      showToast("Sinkronisasi Sheets Selesai", "Semua antrean job berhasil disinkronkan ke Google Sheets.", "success");
    }

    // =========================================================================
    // 8. MODAL HELPERS
    // =========================================================================
    function openModal(id) {
      document.getElementById(id).classList.remove("hidden");
      lucide.createIcons();
    }
    function closeModal(id) {
      document.getElementById(id).classList.add("hidden");
    }
      const cleanHtml = `<!DOCTYPE html>
<html lang="id" class="dark">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>MASDARLING KETAPANGLOR — Sistem Iuran & Transparansi Keuangan</title>
  <script src="https://cdn.tailwindcss.com"><\/script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap" rel="stylesheet">
  <script src="https://unpkg.com/lucide@latest"><\/script>
  <script src="https://cdn.jsdelivr.net/npm/chart.js"><\/script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"><\/script>
  <link rel="stylesheet" href="style.css" />
</head>
<body class="antialiased selection:bg-emerald-500/30 selection:text-emerald-200">
${bodyClone.innerHTML}
  <script src="script.js"><\/script>
</body>
</html>`;