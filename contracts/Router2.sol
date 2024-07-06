// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "./interfaces/IRouter.sol";
import "./libraries/TransferHelper.sol";

contract Router2 {
 
     IRouter public router;

  address public owner = 0x25E103D477025F9A8270328d84397B2cEE32D0BF;

    constructor(address _router) payable {
      
     router = IRouter(_router);
    }


    function addLiquidity(
        address tokenA,
        address tokenB,
        uint amountADesired,
        uint amountBDesired,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
    ) external returns (uint amountA, uint amountB, uint liquidity){

        (amountA, amountB, liquidity) =router.addLiquidity(tokenA, tokenB, amountADesired, amountBDesired, amountAMin, amountBMin, to, deadline);

    }

    function addLiquidityETH(
        address token,
        uint amountTokenDesired,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) external payable returns (uint amountToken, uint amountETH, uint liquidity){

       (amountToken,amountETH,liquidity)= router.addLiquidityETH(token, amountTokenDesired, amountTokenMin, amountETHMin, to, deadline);
    }

      function removeLiquidity(
        address tokenA,
        address tokenB,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline
    ) external returns (uint amountA, uint amountB){
        (amountA,amountB) =router.removeLiquidity(tokenA, tokenB, liquidity, amountAMin, amountBMin, to, deadline);
    }

    function removeLiquidityETH(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) external returns (uint amountToken, uint amountETH){
        (amountToken, amountETH)=router.removeLiquidityETH(token, liquidity, amountTokenMin, amountETHMin, to, deadline);
    }

    function removeLiquidityWithPermit(
        address tokenA,
        address tokenB,
        uint liquidity,
        uint amountAMin,
        uint amountBMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external returns (uint amountA, uint amountB){
        (amountA,amountB)=router.removeLiquidityWithPermit(tokenA, tokenB, liquidity, amountAMin, amountBMin, to, deadline, approveMax, v, r, s);
    }

    
    function removeLiquidityETHWithPermit(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external returns (uint amountToken, uint amountETH){

        (amountToken,amountETH)=router.removeLiquidityETHWithPermit(token, liquidity, amountTokenMin, amountETHMin, to, deadline, approveMax, v, r, s);
    }


    function swapExactTokensForTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external returns (uint[] memory amounts){

        uint256 reducedAmountIn = amountIn * 995 / 1000;
        uint256 admintransferAmount = amountIn - reducedAmountIn;
        uint256[] memory amounts = router.getAmountsOut(reducedAmountIn, path);
        uint256 amountOutMinUpdated = amounts[amounts.length - 1];

        amounts = router.swapExactTokensForTokens(reducedAmountIn, amountOutMinUpdated, path, to, deadline);
        
         TransferHelper.safeTransferFrom(path[0], msg.sender, owner, admintransferAmount);

    }

    function swapTokensForExactTokens(
        uint amountOut,
        uint amountInMax,
        address[] calldata path,
        address to,
        uint deadline
    ) external returns (uint[] memory amounts){
        amounts =router.swapTokensForExactTokens(amountOut, amountInMax, path, to, deadline);
    }


    function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline)
        external
        payable
        returns (uint[] memory amounts){

            amounts = router.swapExactETHForTokens(amountOutMin, path, to, deadline);

        }


    function swapTokensForExactETH(uint amountOut, uint amountInMax, address[] calldata path, address to, uint deadline)
        external
        returns (uint[] memory amounts){

            amounts =router.swapTokensForExactETH(amountOut, amountInMax, path, to, deadline);
        }


    function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline)
        external
        returns (uint[] memory amounts){

            amounts =router.swapExactTokensForETH(amountIn, amountOutMin, path, to, deadline);
        }


    function swapETHForExactTokens(uint amountOut, address[] calldata path, address to, uint deadline)
        external
        payable
        returns (uint[] memory amounts){

            amounts = router.swapETHForExactTokens(amountOut, path, to, deadline);
        }

 
    function removeLiquidityETHSupportingFeeOnTransferTokens(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline
    ) external returns (uint amountETH){

        amountETH = router.removeLiquidityETHSupportingFeeOnTransferTokens(token, liquidity, amountTokenMin, amountETHMin, to, deadline);
    }


    function removeLiquidityETHWithPermitSupportingFeeOnTransferTokens(
        address token,
        uint liquidity,
        uint amountTokenMin,
        uint amountETHMin,
        address to,
        uint deadline,
        bool approveMax, uint8 v, bytes32 r, bytes32 s
    ) external returns (uint amountETH){

        amountETH = router.removeLiquidityETHWithPermitSupportingFeeOnTransferTokens(token, liquidity, amountTokenMin, amountETHMin, to, deadline, approveMax, v, r, s);
    }


    function swapExactTokensForTokensSupportingFeeOnTransferTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external{

       router.swapExactTokensForTokensSupportingFeeOnTransferTokens(amountIn, amountOutMin, path, to, deadline);
    }


    function swapExactETHForTokensSupportingFeeOnTransferTokens(
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external payable{

      router.swapExactETHForTokensSupportingFeeOnTransferTokens(amountOutMin, path, to, deadline);
    }


    function swapExactTokensForETHSupportingFeeOnTransferTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external{

        router.swapExactTokensForETHSupportingFeeOnTransferTokens(amountIn, amountOutMin, path, to, deadline);
    }


}


// swapExactTokensForETHSupportingFeeOnTransferTokens
//swapExactTokensForETH

//    function withdraw(address _token) public payable{

//         require(msg.sender == owner, "Only Owner can withdraw");

//         IERC20 token = IERC20(_token);

//         token.transfer(msg.sender,token.balanceOf(address(this)));

//     }

    
