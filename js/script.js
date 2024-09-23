const donationBtn = document.getElementById('donationBtn');
const historyBtn = document.getElementById('historyBtn');
const donationSection = document.getElementById('donationSection');
const hiddenSection = document.getElementById('hiddenSection');

function showDonation() {
    donationSection.style.display = 'block';
    hiddenSection.style.display = 'none';
}

function showHistory() {
    donationSection.style.display = 'none';
    hiddenSection.style.display = 'block';
}

donationBtn.onclick = showDonation;
historyBtn.onclick = showHistory;

showDonation();


