// Lưu dữ liệu vào localStorage
function saveRecord(time, amount) {
    let records = JSON.parse(localStorage.getItem('milkRecords')) || [];
    records.push({ time, amount });
    localStorage.setItem('milkRecords', JSON.stringify(records));
}

// Lấy dữ liệu từ localStorage
function getRecords() {
    return JSON.parse(localStorage.getItem('milkRecords')) || [];
}

// Vẽ đồ thị bằng Chart.js
function renderChart(records) {
    const ctx = document.getElementById('milk-chart').getContext('2d');
    const times = records.map(record => record.time);
    const amounts = records.map(record => record.amount);

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: times,
            datasets: [{
                label: 'Milk Amount (ml)',
                data: amounts,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderWidth: 2,
                tension: 0.3
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Time'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Milk Amount (ml)'
                    }
                }
            }
        }
    });
}

// Xử lý sự kiện form
document.getElementById('milk-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const time = document.getElementById('time').value;
    const amount = parseInt(document.getElementById('amount').value);

    if (!time || isNaN(amount)) {
        alert('Please enter valid data!');
        return;
    }

    saveRecord(time, amount);
    const records = getRecords();
    renderChart(records);
    e.target.reset();
});

// Hiển thị đồ thị khi tải trang
document.addEventListener('DOMContentLoaded', function () {
    const records = getRecords();
    renderChart(records);
});