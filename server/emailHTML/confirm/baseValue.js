const headers="Гномы ждет правды"
const subject="Подтверждение аккаунта от Гномов"
const text="Подтведрите что ваша почта трушная..."

const html = (code)=>{
    return `
        <h2>Для подтверждения почты используйте ключ</h2>
        <h1>Ключ:${code}</h1>
    `;
}

module.exports = {
    html,
    headers,
    subject,
    text,
}

