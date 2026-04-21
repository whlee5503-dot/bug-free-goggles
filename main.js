
document.addEventListener('DOMContentLoaded', () => {
    console.log('여행 준비물 체크리스트 생성기 스크립트 로드됨');

    // 1. 제외 목록 불러오기 (초기화)
    let excludedItems = new Set(JSON.parse(localStorage.getItem('excludedItems') || '[]'));

    const travelItems = {
        basic: ['여권/신분증', '지갑/신용카드', '휴대폰 및 충전기', '상비약', '속옷/양말', '화장품'],
        sea: ['수영복', '선크림', '선글라스', '방수팩', '아쿠아슈즈'],
        camping: ['텐트', '침낭', '코펠/버너', '랜턴', '아이스박스', '의자/테이블'],
        business: ['노트북/태블릿', '명함', '정장/셔츠', '필기구'],
    };

    const optionsContainer = document.getElementById('options-container');
    const generateBtn = document.getElementById('generate-btn');
    const checklistContainer = document.getElementById('checklist-container');
    let selectedOptions = new Set();

    // 여행 종류 선택 버튼 동적 생성
    Object.keys(travelItems).forEach(key => {
        if (key === 'basic') return;
        const button = document.createElement('button');
        button.className = 'option-btn';
        button.textContent = key;
        button.dataset.key = key;
        optionsContainer.appendChild(button);
    });

    // 옵션 버튼 클릭 이벤트
    optionsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('option-btn')) {
            const key = e.target.dataset.key;
            e.target.classList.toggle('selected');
            selectedOptions.has(key) ? selectedOptions.delete(key) : selectedOptions.add(key);
        }
    });

    // '리스트 생성하기' 버튼 클릭 이벤트
    generateBtn.addEventListener('click', () => {
        let finalList = [...travelItems.basic];
        selectedOptions.forEach(option => {
            finalList = [...finalList, ...travelItems[option]];
        });

        // 3. 리스트 생성 시 필터링
        finalList = [...new Set(finalList)].filter(item => !excludedItems.has(item));

        renderChecklist(finalList);
    });

    // 2. "안 쓸래요" 버튼 클릭 처리 (이벤트 위임)
    checklistContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-item-btn')) {
            const itemToRemove = e.target.dataset.item;
            excludedItems.add(itemToRemove);
            localStorage.setItem('excludedItems', JSON.stringify([...excludedItems])); // localStorage에 저장
            
            // 화면에서 즉시 제거
            e.target.closest('li').remove(); 
            console.log(`'${itemToRemove}' 항목을 제외 목록에 추가했습니다.`);
        }
    });

    function renderChecklist(items) {
        checklistContainer.innerHTML = '';
        const list = document.createElement('ul');
        if (items.length === 0) {
            checklistContainer.innerHTML = '<p>모든 준비가 끝났거나, 생성할 항목이 없습니다!</p>';
            return;
        }
        items.forEach(item => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <input type="checkbox" id="${item}" name="${item}">
                <label for="${item}">${item}</label>
                <button class="remove-item-btn" data-item="${item}">안 쓸래요</button>
            `;
            list.appendChild(listItem);
        });
        checklistContainer.appendChild(list);
    }
});
