const btn = document.getElementById("submitbtn");
const table = document.getElementById("table");
const char_s2 = document.getElementById("char_s2");
const row_value = document.getElementById("row_value");
const llcs = document.getElementById("llcs");
const lcs = document.getElementById("lcs");
const dpt = document.getElementById("dpt");
const result = document.getElementById("result");

function combine(arr,i){
    var str="";
    for(var h=0; h<arr[i].length; h++){
        str += `<td>`;
        str += arr[i][h];
        str += "</td>"
    }

    return str;
}

function LCS(str1, str2){
    let m = str1.length;
    let n = str2.length;

    char_s2.innerHTML = "";
    row_value.innerHTML = "";

    var arr = new Array(m+1);
    for (var i = 0; i < arr.length; i++) {
        arr[i] = new Array(n+1);
    }

    for(var i=0; i<=m; i++){
        for(var j=0; j<=n; j++){
            if (i == 0 || j == 0)
                arr[i][j] = 0;
            else if (str1[i-1] == str2[j-1])
                arr[i][j] = arr[i-1][j-1] + 1;
            else
                arr[i][j] = Math.max(arr[i-1][j], arr[i][j-1]);
        }
    }

    let index = arr[m][n];

    let ans = "";
    let a = m;
    let b = n;

    while(a>0 && b>0){
        if(str1[a-1]==str2[b-1]){
            ans = str1[a-1] + ans;
            a--;
            b--;
        }
        else if (arr[a-1][b] > arr[a][b-1])
            a--;
        else
            b--;
    }
    char_s2.innerHTML = `<th scope="col" >#</th>`;
    char_s2.innerHTML += `<th scope="col">`+0+`</th>`;
    for(var l=1; l<=n; l++){
        char_s2.innerHTML += `<th scope="col" >`+str2[l-1]+`</th>`;
    }

    row_value.innerHTML += "<tr>"+`<th scope="row">`+0+`</th>`+ combine(arr,0) +"</tr>";
    for(var e=1; e<=m; e++){
        row_value.innerHTML += "<tr>"+`<th scope="row">`+str1[e-1]+`</th>`+ combine(arr,e) +"</tr>";
    }

    return ans;
}

let x,y,res;
    
btn.addEventListener("click", function(e){
    e.preventDefault();
    result.innerHTML = "";
    llcs.innerHTML = "";
    lcs.innerHTML = "";
    dpt.innerHTML = "";
    x = document.getElementById("str1").value;
    y = document.getElementById("str2").value;
    result.innerHTML = `<h1 style="border-bottom: 6px double;">Result</h1>`;
    llcs.innerHTML = "Length of Longest Common Subsequence : ";
    lcs.innerHTML = "Longest Common Subsequence : ";
    dpt.innerHTML = "<u>Dynamic Programming Table</u>";

    res = LCS(x,y);

    lcs.innerHTML += "<b>"+res+"</b>";
    llcs.innerHTML += "<b>"+res.length+"</b>"
});