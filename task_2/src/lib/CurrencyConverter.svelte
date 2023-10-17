<script>
    let amount = 0.0;
    let convertFrom = "RUB";
    let finalAmount = 0;
    let convertTo = "";

    let currencyList = [
        { name: "USD", desc: "US Dollar" },
        { name: "EUR", desc: "Euro" },
        { name: "INR", desc: "Indian Rupee" },
    ];

    async function convertCurrency() {
        finalAmount = 0.0;
        let url = `https://v6.exchangerate-api.com/v6/eac57033fe9c04693f0f4d97/pair/${convertFrom}/${convertTo}`;

        await fetch(url)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data);
                let rate = data.conversion_rate;
                finalAmount = rate * amount;
            });
    }
</script>

<div class="wrap currency">
    <h1 class="currency__header">Конвертор валют</h1>

    <div class="currency__main">
        <div class="currancy__main-from">
            <p>Из</p>
            <input
                type="number"
                name="currencyAmount"
                placeholder="Enter Amount"
                bind:value={amount}
            />
            <select class="px-4 py-3 rounded-full" bind:value={convertFrom}>
                {#each currencyList as cl}
                    <option value={cl.name}>
                        {cl.desc}
                    </option>
                {/each}
            </select>
        </div>
        <div class="currancy__main-to">
            <p>Перевести в</p>

            <select
                class="px-4 py-3 rounded-full"
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
            <p> {amount} {convertFrom} equals {finalAmount} {convertTo}</p>
        </div>
    </div>
</div>


