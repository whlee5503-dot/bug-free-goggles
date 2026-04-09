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
                numberDiv.classList.add(getNumberClass(num));
                numberDiv.textContent = num;
                numberContainer.appendChild(numberDiv);
            });

            const bonusContainer = document.createElement('div');
            bonusContainer.classList.add('bonus-container');
            const bonusNumberDiv = document.createElement('div');
            bonusNumberDiv.classList.add('number');
            bonusNumberDiv.classList.add('bonus');
            bonusNumberDiv.classList.add(getNumberClass(bonusNumber));
            bonusNumberDiv.textContent = bonusNumber;
            bonusContainer.innerHTML = `<p>Bonus</p>`;
            bonusContainer.appendChild(bonusNumberDiv);

            setElement.appendChild(numberContainer);
            setElement.appendChild(bonusContainer);
            lottoSetsContainer.appendChild(setElement);
        }
    }

    function getNumberClass(num) {
        if (num <= 10) return 'range-1-10';
        if (num <= 20) return 'range-11-20';
        if (num <= 30) return 'range-21-30';
        if (num <= 40) return 'range-31-40';
        return 'range-41-45';
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
