const baseUrl="https://v6.exchangerate-api.com/v6/db1438e729c1926c6314255a/latest";
const btn=document.querySelector("button");
const dropdowns=document.querySelectorAll(".dropdown select");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select")
const output=document.querySelector(".msg");



for(let select of dropdowns)
    {
        for( currCode in countryList){
            
            let newOption=document.createElement("option");
            newOption.innerText=currCode;
            newOption.value=currCode;
            //console.log(currCode);
            
            if(select.name==="from"&&currCode==="USD"){
                newOption.selected="selected";
            }else if(select.name==="to"&&currCode==="INR"){
                newOption.selected="selected";
            }
            select.append(newOption);
            
        }
        select.addEventListener("change",(evt)=>{
            updateFlag(evt.target);
        });
    }
    const updateExchangeRate=async()=>{
        let amount=document.querySelector("#inp");
            //console.log(amount.value)
            amtVal=amount.value;
            if(amtVal===""||amtVal<1){
                amtVal=1;
                amount.value=1;
            }
            const URL=`${baseUrl}/${fromCurr.value}`;
            //console.log(URL);
            let response= await fetch(URL);
            //console.log(response);
            let data=await response.json();
            //console.log(data);
            let toval=toCurr.value;
            let disp= data.conversion_rates[toval];
            disp=disp*amtVal;
            //console.log(amtVal);
            let Display=`${amtVal}  ${fromCurr.value} = ${disp}  ${toCurr.value}`;
            output.innerText=Display;
     }
    
    const updateFlag=(element)=>{
        let currCode=element.value;
        //console.log(currCode);
        let countryCode=countryList[currCode];
        //console.log(countryCode)
        let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
        let img=element.parentElement.querySelector("img");
        img.src=newSrc;
    }

    btn.addEventListener("click", (evt)=>{
        evt.preventDefault();
        updateExchangeRate();
        
        
        
    });
    window.addEventListener("load",()=>{
        updateExchangeRate();
    });

 