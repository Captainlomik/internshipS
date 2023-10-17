<script lang="ts">
    // @ts-nocheck
    let amount = 0.0;
    let convertFrom = "USD";
    let finalAmount = 0.0;
    let convertTo = "";
    let rate = 0.0;

    let currencyList = [
        { name: "USD", desc: "Американский доллар" },
        { name: "EUR", desc: "Евро" },
        { name: "RUB", desc: "Рубль" },
    ];

    async function convertCurrency() {
        let url = `https://v6.exchangerate-api.com/v6/eac57033fe9c04693f0f4d97/pair/${convertFrom}/${convertTo}`;

        await fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                rate = data.conversion_rate;
                finalAmount = Math.round(rate * amount * 100) / 100;
            });
    }

    function getAmount(num: number) {
        amount = +num;
        if (rate !== 0) finalAmount = Math.round(rate * amount * 100) / 100;
    }

    function getfinalAmount(num: number) {
        finalAmount = +num;
        if (rate !== 0) amount = Math.round((finalAmount / rate) * 100) / 100;
    }
</script>

<div class="wrap currency">
    <h1 class="currency__header">Конвертор валют</h1>

    <div class="currency__main">
        <div class="currancy__main-from">
            <p class="from__label">Из</p>
            <input
                class="from__input"
                type="number"
                name="value1"
                placeholder="Значение 1"
                value={amount}
                on:input={(e) => getAmount(e.target.value)}
            />
            <select
                class="from__select"
                bind:value={convertFrom}
                on:change={convertCurrency}
            >
                {#each currencyList as cl}
                    <option value={cl.name}>
                        {cl.desc}
                    </option>
                {/each}
            </select>

            {#if rate === 0}<p>Укажите валюту для перевода</p> {/if}
        </div>
        <div class="currancy__main-to">
            <p class="from__label">Перевести в</p>
            <input
                class="from__input"
                type="number"
                name="value2"
                placeholder="Значение 2"
                value={finalAmount}
                on:input={(e) => getfinalAmount(e.target.value)}
            />
            <select
                class="from__select"
                bind:value={convertTo}
                on:change={convertCurrency}
            >
                {#each currencyList as cl}
                    <option value={cl.name}>
                        {cl.desc}
                    </option>
                {/each}
            </select>
        </div>
        <div class="currancy__main-result">
            {#if finalAmount}
                <p>{amount} {convertFrom} равен {finalAmount} {convertTo}</p>
            {/if}
        </div>
    </div>
</div>
