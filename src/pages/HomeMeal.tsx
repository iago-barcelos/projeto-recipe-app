import React from 'react';

function HomeMeal() {
  const local = JSON.parse(localStorage.getItem('user') as string);
  console.log(local);
  return (
    <div>
      <header>
        <h1>Tela de Receitas de Comidas</h1>
      </header>
    </div>
  );
}

export default HomeMeal;
