function division(a: number, b: number) {
    if(b === 0) {
        throw new Error("Pas de division par 0 svp.")
    }
    return a/b;
}
try {
    const resultat = division(1, 2);
    console.log(resultat)
} catch(error) {
    console.log("OULA ERROR")
}

function genereGrandRandom(success: any, error: any) {
    setTimeout(()  => {
        const random: number = parseInt(Math.random().toFixed(2))
        if(random !== undefined && random > 0.5 ) {
            success("Succès, grand random : " + random);
        } else {
            error("Error, petit random : " + random);
        }
    })

}
const promesse = new Promise(genereGrandRandom);

promesse.then(( responseSuccess) => {
    console.log("réponse positive", responseSuccess)
}).catch((responseError) => {
    console.log("réponse négative", responseError)
})