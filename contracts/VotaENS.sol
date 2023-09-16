pragma solidity ^0.8.9;

contract VotaENS {
    address payable public owner;
    mapping(address => ENSEnderecoVotado) votos;
    mapping(address => address) votoDePessoa;
    address[] enderecosVotados;

    struct ENSEnderecoVotado {
        address votedAddress;
        bool isInitialized;
        uint votos;
    }

    constructor() payable {
        owner = payable(msg.sender);
    }

    modifier onlyOwner() {
        require(
            msg.sender == owner,
            "somente o owner pode realizar esta funcao"
        );
        _;
    }

    function registerENS(address contractAddress) public onlyOwner {
        require(
            votos[contractAddress].isInitialized == false,
            "Contrato ja existe"
        );
        votos[contractAddress].isInitialized = true;
        votos[contractAddress].votedAddress = contractAddress;
        votos[contractAddress].votos = 0;
        enderecosVotados.push(contractAddress);
    }

    function getWinner() public view returns (address) {
        address winner = address(0);
        uint winnerAmmount = 0;
        for (uint i = 0; i < enderecosVotados.length; i++) {
            if (votos[enderecosVotados[i]].votos > winnerAmmount) {
                winnerAmmount = votos[enderecosVotados[i]].votos;
                winner = enderecosVotados[i];
            }
        }
        return winner;
    }

    function getVotos(address contractAddress) public view returns (uint) {
        require(
            votos[contractAddress].isInitialized == true,
            "Contrato nao existe"
        );
        return votos[contractAddress].votos;
    }

    function vote(address votedEnsContract) public {
        require(
            votos[votedEnsContract].isInitialized,
            "endereco nao registrado para votacao"
        );

        if (votoDePessoa[msg.sender] != address(0)) {
            votos[votedEnsContract].votos -= 1;
        }
        votoDePessoa[msg.sender] = votedEnsContract;
        votos[votedEnsContract].votos += 1;
    }
}
