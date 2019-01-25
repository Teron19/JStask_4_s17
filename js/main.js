;(() => {
   'use strict'
   const btn = document.getElementById("play");
   let copyDate;

   function transform() {
      copyDate = data.slice() // делаем копию масива и дальше работаем с копией
      copyDate.splice(5, 1) //+
      copyDate = prepareData(copyDate) //+
      copyDate = formatData(copyDate) //+
      copyDate = filterData(copyDate)
      copyDate = printResult(copyDate)
   }

   function prepareData(arr) {
      let newArr = [];
      arr.forEach(element => {
         newArr.push({
            url: element.url,
            name: element.name,
            params: element.params,
            description: element.description,
            date: element.date
         })
      });
      return newArr;
   }

   function formatData(arr) {
      let mapArr = arr.map((el) => {
         return ({
            name: transformName(el.name),
            url: transUrl(el.url),
            description: transDescription(el.description),
            date: newDat(el.date),
            params: newParam(el.params),
            isVisible: newIsVisible(el)
         })
      })
      return mapArr;
   }

   function transformName(el) {
      return `${el.slice(0,1).toUpperCase()}${el.slice(1).toLowerCase()}`;
   }

   function transUrl(url) {
      return 'http://' + url;
   }

   function transDescription(el) {
      return (el.length > 15) 
         ? el.substr(0, 15) + '...' 
         : el;
   }

   function newDat(milliseconds) {
      return moment(milliseconds).format('YYYY/MM/DD HH:mm');
      /* YYYY- вывод год в 4(цифрах) числа'2019' YY-вывод будет 19 год
          MM - вывод месяца в 2 (цифрах) "07" MMM- покажет какой сейчас месяц буквами
          DD - вывод дня в 2 (цыфрах) 05
          HH - вывод часа 17:
          mm - вывод минут :30
          '/' and ':' являются разделителями
      */
   }

   function newParam(el) {
      return `${el.status} => ${el.progress}`;
   }

   function newIsVisible(el) {
      return el.params.status;
   }

   function filterData(data) {
      return data.filter((el) => {
         return el.isVisible; //true/false
      })
   }

   function printResult(dataPrint) { //каждый обект будем печатать отдельно 
      dataPrint.forEach((elem, index) => {
         console.log(`
         Element of array: ${index}
         name: ${elem.name}
         url: ${elem.url}
         description: ${elem.description}
         date: ${elem.params}
         params: ${elem.params}
         isVisible: ${elem.isVisible}`)
      });
      dataPrint.forEach(el => console.table(el));
   }

   btn.addEventListener("click", transform);
})();