document.addEventListener('DOMContentLoaded', () => {
    const generateBtn = document.getElementById('generate-btn');
    const lottoSetsContainer = document.getElementById('lotto-sets-container');
    const themeSwitch = document.getElementById('theme-switch');

    function generateSingleLottoSet() {
        const numbers = new Set();
        while (numbers.size < 6) {
            numbers.add(Math.floor(Math.random() * 45) + 1);
        }
        const numberArray = Array.from(numbers);
        const bonusNumber = numberArray.pop();
        const mainNumbers = numberArray.sort((a, b) => a - b);
        return { mainNumbers, bonusNumber };
    }

    function generateAndDisplaySets() {
        lottoSetsContainer.innerHTML = ''; // Clear previous sets
        for (let i = 0; i < 5; i++) {
            const { mainNumbers, bonusNumber } = generateSingleLottoSet();
            
            const setElement = document.createElement('div');
            setElement.classList.add('lotto-set');

            const numberContainer = document.createElement('div');
            numberContainer.classList.add('number-container');

            mainNumbers.forEach(num => {
                const numberDiv = document.createElement('div');
                numberDiv.classList.add('number');
                numberDiv.textContent = num;
                numberContainer.appendChild(numberDiv);
            });

            const bonusContainer = document.createElement('div');
            bonusContainer.classList.add('bonus-container');
            bonusContainer.innerHTML = `<p>Bonus</p><div class="number bonus">${bonusNumber}</div>`;

            setElement.appendChild(numberContainer);
            setElement.appendChild(bonusContainer);
            lottoSetsContainer.appendChild(setElement);
        }
    }

    function switchTheme() {
        if (themeSwitch.value === 'dark') {
            document.body.classList.add('dark-mode');
            document.body.classList.remove('light-mode');
        } else {
            document.body.classList.add('light-mode');
            document.body.classList.remove('dark-mode');
        }
    }

    generateBtn.addEventListener('click', generateAndDisplaySets);
    themeSwitch.addEventListener('change', switchTheme);

    // Initial setup
    switchTheme();
    generateAndDisplaySets();
});
