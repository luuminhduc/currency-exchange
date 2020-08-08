export function displayCurrency(list, selects) {
    selects.forEach(el => {
        list.forEach((option, idx) => {
            const optionEl = document.createElement('option');
            optionEl.value = option;
            optionEl.innerText = option;
            if(el.classList.contains('to-select')) {
                if(option === 'EUR') {
                    optionEl.selected = true;
                }
            }else{
                if(option === 'USD') {
                    optionEl.selected = true;
                }
            }
            el.appendChild(optionEl);
        })
    })

}