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
        let url = `https://v6.exchangerate-api.com/v6/eac57033fe9c04693f0f4d97/pair/${convertFrom}/${convertTo}`

        await fetch(url).then( response => {
            return response.json()
        })
        .then( data => {
            console.log(data)
            let rate = data.conversion_rate
            finalAmount = rate * amount
        })
    }
</script>

<div class="mt-4 rounded shadow border bg-red-50">

    <div id="currency-converter" class="px-4 py-4">

        <h1 class="font-bold text-3xl font-sans justify-center mb-10">
            Currency Converter
        </h1> <br />

        <span class="mt-10">Enter Amount:</span>

        <input class="px-2 py-2 focus:ring-indigo-500 focus:border-indigo-500 rounded sm:text-sm border-gray-300" type="number" name="currencyAmount" placeholder="Enter Amount" bind:value="{amount}" />
        <br /> <br/>

        <span>Convert From:</span>

        <select class="px-4 py-3 rounded-full" bind:value={convertFrom} >
            {#each currencyList as cl }
                <option value="{cl.name}">
                    {cl.desc}
                </option>
            {/each}
        </select>

        <span class="ml-10 mr-10">Convert To:</span>

        <select class="px-4 py-3 rounded-full" bind:value={convertTo} on:change="{convertCurrency}">

            {#each currencyList as cl }
                <option value="{cl.name}">
                    {cl.desc}
                </option>
            {/each}
        </select><br/><br/>

        <span> {amount} {convertFrom} equals {finalAmount} {convertTo}</span>

    </div>

</div>