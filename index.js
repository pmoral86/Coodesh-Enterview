const  {Builder, By, Key, unitl} = require ("selenium-webdriver");
const assert = require ("assert");

async function example() {
    let driver = await new Builder().forBrowser("chrome").build(); // abrindo Chrome
    await driver.get("https://beta.coodesh.com/"); // indo para o sistema
    await driver.sleep(4000); // aguardando 4 segundos para localizar o elemento dos Cookies
    await driver.findElement(By.id("onetrust-accept-btn-handler")).click(); // clicando no OK dos Cookies
    let confirmHome = await driver.findElement(By.css("#content > div > div > div > div.text-center.text-lg-left.space-top-2.col-lg-6 > div > span")).getText().then(function(value) {
        return value
    });
    assert.strictEqual(confirmHome, "Conectamos\ndevelopers validados\nàs empresas"); // 1 - Se a página está carregando corretamente a home page
    await driver.sleep(2000);
    await driver.executeScript("window.alert('Home ok!')");
    await driver.sleep(2000);
    await driver.switchTo().alert().accept();
    await driver.findElement(By.className("u-hamburger__inner")).click(); // Clicando no Menu
    await driver.findElement(By.className("nav-link u-header__nav-link")).click(); // 2 - Navegar pela página e ir ao sistema de vagas no menú superior
    await driver.sleep(4000);
    let companyName = await driver.findElement(By.css("#content > div > div:nth-child(3) > div:nth-child(1) > a > div.p-3 > div.d-lg-flex.justify-content-between.px-2.row > div.d-flex.align-items-center.pr-0.col-xl-5.col-lg-6 > div.pr-4.mb-3.mr-1.pt-1 > ul > li:nth-child(1) > span")).getText();
    await driver.findElement(By.name("search")).sendKeys(companyName); // com o texto do nome da empresa salvo na variavel, jogo ele no search
    await driver.findElement(By.className("jsx-2868889731 fas fa-search btn-icon__inner")).click(); // 3 - Um vez na tela de vagas, nosso sistema de teste automatizado terá que buscar por `uma empresa` onde terá um ou mais resultados de vagas
    await driver.manage().window().maximize();
    await driver.sleep(4000);
    await driver.findElement(By.className("h4 font-weight-medium text-dark mb-1")).click();
    await driver.sleep(2000);
    let confirmPage = await driver.findElement(By.css("#content > div > div > div.mb-lg-0.d-none.d-lg-block.col-lg-5 > nav > div.m-0.row > button")).getText().then(function(value){
        return value
    }); // confirmando que a vaga abriu copiando um texto fixo da mesma
    assert.strictEqual(confirmPage, "Tenho Interesse"); // 4 - Depois obter o resultado, deveremos abrir a vaga e revisar se o carregamento é realizado com sucesso ou não
    await driver.sleep(2000);
    await driver.executeScript("window.alert('Vaga ok!')");
    await driver.sleep(2000);
    await driver.switchTo().alert().accept();
    await driver.findElement(By.css("#content > div > div > div.mb-lg-0.d-none.d-lg-block.col-lg-5 > nav > div.m-0.row > button")).click(); // 5.1 - Por último, precisamos saber se o sistema de candidatar está funcionando e para isso é necessário clicar no botão `Candidatar-se`...
    await driver.sleep(4000);
    let confirmModal = await driver.findElement(By.css("body > div:nth-child(34) > div > div > div.modal-body > div > div > div > div.text-center.space-bottom-1 > h2")).getText().then(function(value) {
        return value
    });
    assert.strictEqual(confirmModal, "Faça login"); // 5.2 - e revisar se abriu o modal corretamente
    await driver.sleep(2000);
    await driver.executeScript("window.alert('Modal ok! All Tests passed ok!')");
    await driver.sleep(2000);
    await driver.quit();
};
example();