const donationBtn = document.getElementById('donationBtn');
const historyBtn = document.getElementById('historyBtn');
const donationSection = document.getElementById('donationSection');
const hiddenSection = document.getElementById('hiddenSection');

function showDonation() {
    donationSection.style.display = 'block';
    hiddenSection.style.display = 'none';

    donationBtn.classList.remove('bg-gray-500', 'text-white');
    donationBtn.classList.add('bg-[#B4F461]', 'text-black');

    historyBtn.classList.remove('bg-[#B4F461]', 'text-black');
    historyBtn.classList.add('bg-gray-500', 'text-white');
}

function showHistory() {
    donationSection.style.display = 'none';
    hiddenSection.style.display = 'block';

    donationBtn.classList.remove('bg-[#B4F461]', 'text-black');
    donationBtn.classList.add('bg-gray-500', 'text-white');

    historyBtn.classList.remove('bg-gray-500', 'text-white');
    historyBtn.classList.add('bg-[#B4F461]', 'text-black');
}

donationBtn.onclick = showDonation;
historyBtn.onclick = showHistory;

showDonation();




function donateToCause(causeInputId, causeMoneyId, donationBtnId, causeName) {
    const causeInput = document.getElementById(causeInputId);
    const causeMoney = document.getElementById(causeMoneyId);
    const currentMoney = document.getElementById('current-money');

    document.getElementById(donationBtnId).addEventListener('click', function () {
        let donationAmount = parseInt(causeInput.value);
        let availableMoney = parseInt(currentMoney.textContent.replace(/\D/g, ''));
        let currentCauseMoney = parseInt(causeMoney.textContent.replace(/\D/g, ''));

        if (isNaN(donationAmount) || donationAmount <= 0) {
            alert("Please enter a valid positive number.");
            return;
        }

        if (donationAmount > availableMoney) {
            alert("Donation amount cannot exceed current available funds.");
            return;
        }

        causeMoney.textContent = (currentCauseMoney + donationAmount).toLocaleString() + ' BDT';
        currentMoney.textContent = (availableMoney - donationAmount).toLocaleString() + ' BDT';

        causeInput.value = '';

        const currentDate = new Date().toString();

        const lastTransaction = {
            amount: donationAmount,
            cause: causeName,
            date: currentDate
        };
        localStorage.setItem('lastTransaction', JSON.stringify(lastTransaction));
    });
}

donateToCause('noakhali-input', 'noakhali-money', 'noakhali-donation', 'Flood at Noakhali, Bangladesh');

donateToCause('feni-input', 'feni-money', 'feni-donatation', 'Flood Relief in Feni, Bangladesh');

donateToCause('quota-protest-input', 'quota-protest-money', 'quota-protest-donation', 'Injured in Quota Movement');

document.getElementById('historyBtn').addEventListener('click', function () {

    const hiddenSection = document.getElementById('hiddenSection');

    const lastTransaction = JSON.parse(localStorage.getItem('lastTransaction'));

    if (lastTransaction) {
        hiddenSection.innerHTML = `
            <p class="text-center text-xl font-bold">${lastTransaction.amount} BDT is Donated for ${lastTransaction.cause}</p>
            <p class="text-center">Date: ${lastTransaction.date}</p>
        `;
    } else {
        hiddenSection.innerHTML = `<p class="text-center text-xl">No transaction history available.</p>`;
    }

    hiddenSection.style.display = 'block';
});

document.querySelectorAll('input[type="text"]').forEach(input => {
    input.addEventListener('input', function () {
        this.value = this.value.replace(/\D/g, '');
    });
});


