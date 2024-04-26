// fileSystem library를 쓰려고 가져와본다
const fs = require('fs');

// function findAll(path, typeName, fileName, ...) {  <= 필수param하나만 넣고 나머진 객체로 던져줘라! 하고 {}로 씀
function findAll(path, {typeName}) { // object를 {typeName, fileName}으로 뽀개기!!
    let fileList = fs.readdirSync(path);

    if(typeName) {
        // let filteredList = fileList.filter((fileName)=>fileName.endsWith(".js"));
        // let mappedList = filteredList.map((fileName)=>fileName.replace(".js", ""));

        // return filteredList;

        // mapping하고 filtering할래? ㄴㄴ! filtering하고 mapping해야지. SQL도 where구문 먼저 하니까~
        // 이건 JS array의 기능이고! Java Collection에서 쓰면 이게 Stream임 ㅠㅠ 이제 이해했따
        let list = fs
                .readdirSync(path, {withFileTypes:true})
                .filter(item=>item.isDirectory())
                .map(item=>item.name);          // 폴더명은 item의 속성!!! item -> item.name list로 범위를 줄여가지구 가공하는것. 
                
                // .filter((item)=>item.endsWith(".js"))
                // .map((item)=>item.replace(".js", ""))
                // .reduce((pre/*앞에서 집계한 값*/, curItem/*현재 가공중인 아이템, fileName*/)=>pre+curItem.length,0);

                /* reduce의 return 값은 number, scalar.
                   첫 아이템 file-repository의 pre값을 확인했는데 없음. 왜냐면 array의 0번째index니까.. 그래서 0을 return받고
                   file-repository가 curItem이 되었을땐 15를 return받음.
                   그 다음엔 first가 curItem이 되고, 15는 pre가 되어서.. 15+5! 그래서 return값은 20이 된다
                */

        return list;
    }

    return fileList;
}

// findall함수를 노출하겠다고 함! exports는 노출할 객체, findAll은 속성..!
exports.findAll = findAll;