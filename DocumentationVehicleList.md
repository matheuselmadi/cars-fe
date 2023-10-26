# Documentação de Uso do Componente VehicleList
## Descrição

O componente VehicleList é um componente React que exibe uma lista de veículos agrupados por marca. Ele recebe uma lista de veículos como entrada e os organiza em grupos com base em suas marcas. Cada grupo de veículos é exibido em uma tabela separada, permitindo a fácil visualização de veículos de uma determinada marca. Ele utiliza o componente VehicleTable para exibir detalhes dos veículos.

## Instalação
Antes de usar o componente VehicleList, certifique-se de que você tenha React e suas dependências instaladas em seu projeto. Em seguida, siga os passos abaixo para incluir o componente em outra tela:

Importe o componente VehicleList no seu arquivo JavaScript/JSX onde deseja utilizá-lo:

```sh
import VehicleList from './components/VehicleList';
```

## Propriedades (Props)
O componente VehicleList espera dois parâmetros:

- vehicles (Array de Objetos): Uma lista de veículos que você deseja exibir no componente.
- onEdit (Função): Uma função que será chamada quando o usuário clicar no botão de edição de um veículo.

## Visualização dos Veículos:

O componente VehicleList irá renderizar a lista de veículos agrupados por marca. Cada grupo de veículos terá um título com o nome da marca(id) e uma tabela exibindo os detalhes dos veículos.

## Edição de Veículos:

A função onEdit será chamada quando o usuário clicar no botão de edição de um veículo. Certifique-se de implementar a lógica necessária para lidar com a edição de veículos dentro dessa função.