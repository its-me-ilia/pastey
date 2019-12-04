import React from 'react';
import PaginateButton from './PaginateButton';
import ActiveButton from './ActiveButton';
import PaginateButtons from './PaginateButtons';
import PaginateNextButton from './PaginateNextBtn';
import PaginatePreviousButton from './PaginatePrevButton';
import {useSelector} from 'react-redux';
const PaginateButtonsContainer = () => {
    const archiveReducer = useSelector(state => state.archiver);
    const totalPagesUndefinedVals = [...Array(archiveReducer.totalPages)]; //get array with length of totalPages with values of undefined
    const totalPages = [...totalPagesUndefinedVals.keys()]; //get keys of array which has values of undefined and iterate over it with es6 spread syntax
    const range = 2
    const pagesInForwardRange = totalPages.slice(archiveReducer.currentPage, archiveReducer.currentPage + range /*<----XXX this number */); //get 5 pages in range from currentpage
    console.log(Math.max(0, archiveReducer.currentPage - 1 - range),Math.max(0, archiveReducer.currentPage - 1))
    const pagesInBackwardRange = totalPages.slice(Math.max(0, archiveReducer.currentPage - 1 - range), Math.max(0, archiveReducer.currentPage - 1))
    //gadaakete da marto wina pageebi aige anu cp dan daaslice
    console.log(totalPages,pagesInForwardRange,totalPages.indexOf(pagesInForwardRange[0]));
    console.log([...totalPages][0]);
    //sheamowme tu totalPages bolo cifrs + 1 ze metia current Page
    return (
        //<PaginateButtons>
        //  {archiveReducer.currentPage - 1 <= 0 ? null : <PaginatePreviousButton pageNum={archiveReducer.currentPage - 1} /> /*check if clicking previous button takes you to zero or negative page and if it is do not display button to avoid error (გვერდი უნდა იყოს დადებითი რიცხვი) */}
        //   {totalPages.indexOf(pagesInForwardRange[0]) !== 0 ? <PaginateButton pageNum={1} /> :  null} {/*check if (index of first element of pagesInFowrardRange) is not first (0) in totalPages because if it is the map function will display it anwyay and we do not need to have two "1" buttons */}
        //   {archiveReducer.currentPage > range ? <span>...</span> : null /*theres gotta be at least two button ahead first button to display ... after, we do not like to display that 1...2 or 1...3. but if it is three we want to display it like 1...4*/}
        //   {pagesInForwardRange.map((val,i)=>{
        //       console.log(val+1, archiveReducer.currentPage)
        //           if(val+1 === archiveReducer.currentPage){
        //                return (
        //                    <React.Fragment>
        //                        {archiveReducer.currentPage - 2 > 0 ? /*first element of totalPages*/ <PaginateButton key={val - 1} pageNum={val} />: null}
        //                        <ActiveButton key={val} pageNum={val+1} />
        //                    </React.Fragment>
        //                ) // we are incrementing val because it is index and we want pages to start from 1 not zero, and if total pages are 3 and val is not incremented we end up getting 0,1,2 instead of 1,2,3
        //           }else{
        //               return <PaginateButton key={val} pageNum={val+1} />
        //           }
        //       })}
        //    {/* Create ... before last button, is bugi sheaswore page ro 4 s udris*/}
        //    {console.log(`pages in range ${totalPages.indexOf([...pagesInForwardRange].slice(-1).pop())}, totalPages ${totalPages.indexOf([...totalPages].slice(-1).pop())}`)}
        //    {totalPages.indexOf([...totalPages].slice(-1).pop()) + 1 - archiveReducer.currentPage > range /*<-----XXXXX and this number got to be the same */ ? <span>...</span> : null /*same thing as for first page we get last element of totalPages and add 1 to it because totalPages array has original totalPages array keys and it starts from 0 (its val not index) and page query starts from 1 so if currentPage is 6 and the last element of totalPages is also 6, because totalPages starts from 0, we need to incerement it by 1 because we also incerement button numbers by one. and in other hand when last button value is 7 (so it is 6 in totalPages array) we substract it by current page (e.g: 3) and check if result is more than 3 (range)*/}
        //    {totalPages.indexOf([...pagesInForwardRange].slice(-1).pop()) === totalPages.indexOf([...totalPages].slice(-1).pop()) && totalPages.indexOf([...totalPages].slice(-1).pop()) !== undefined ? null : <PaginateButton pageNum={totalPages.indexOf([...totalPages].slice(-1).pop()) + 1} /> /*we are comparing index of last element in pagesInForwardRange and index of last element of totalPages. if totalPages are [0,1,2,3,4,5] and pagesInForwardRange is [2,3,4,5] we check if index of 5 (last element in pagesInForwardRange) in totalPages, is equal to index of 5 (last element in totalPages), so index of 5(pagesInForwardRange), in totalPages is equal to 6, and index of last element of totalPages (5) is also equal to 6 so we do not need to write last button manually because it is inside pagesInForwardRange and it will be mapped, and if pagesInForwardRange is [0,1,2,3] and totalPages is [0,1,2,3,4,5], the index of 3 (last element of pagesInForwardRange) in totalPages are 4 ([0,1,2,3(4),4,5]) and index of last element of totalPages (5) is 6. they are not equal (LEOPiR (last element of pages in Range) is less then LEOTP (last elements of totalPages)) and we need to display last element of totalPages manually because it will not be mapped (is not included in pagesInRaneg). we are also checking if last element of totalPages is undefined in case it is empty array (if it is empty array pagesInForwardRange is so, and we do not need do check its last value for being undefined) */}
        //    {totalPages.length < archiveReducer.currentPage + 1 ? null : <PaginateNextButton pageNum={archiveReducer.currentPage + 1}/> }
        //</PaginateButtons>
        <PaginateButtons>
            {archiveReducer.currentPage - 1 <= 0 ? null : <PaginatePreviousButton pageNum={archiveReducer.currentPage - 1}/>}
            {console.log(pagesInBackwardRange[0], totalPages[0], [...pagesInBackwardRange][0] === [...totalPages][0])}
            {[...pagesInBackwardRange][0] === [...totalPages][0] || [...pagesInBackwardRange][0] === undefined ? null : <PaginateButton pageNum="1" />}
            {archiveReducer.currentPage - range > 1 ? <span>...</span> : null}
            {pagesInBackwardRange.map((val,i)=>{
                return (
                    <PaginateButton key={val} pageNum={val+1} />
                )
            })}
            <ActiveButton pageNum={archiveReducer.currentPage}/>
            {pagesInForwardRange.map((val,i)=>{
                return (
                    <PaginateButton key={val} pageNum={val+1} />
                )
            })}
           {/*this (down below) could also be done if we wrapped both values with totalPages.indexOf() but hence page numbers are unique and keys and values are equal in totalPages it does not matters*/}
           {[...totalPages].slice(-1).pop() - [...pagesInForwardRange].slice(-1).pop() > 1 ? <span>...</span> : null /*(LEO (last element of) we are substracting LEO pages in forward range to LEO totalPages and if there is more than 2 in result we display ... ; visual: pages: 0,1,2,3,4,5,6; current_page = 2;  last element of range 4 there is two elements left and we are displaying ... and if cp is 3 there is 1 element left (and it is 6) and we do not need ...  */}
           {[...pagesInForwardRange].slice(-1).pop() === [...totalPages].slice(-1).pop() || [...pagesInForwardRange].slice(-1).pop() === undefined ? null : <PaginateButton pageNum={[...totalPages].slice(-1).pop() + 1} /> }
           {archiveReducer.currentPage + 1 > totalPages.length ? null : <PaginateNextButton pageNum={archiveReducer.currentPage + 1}/>}
        </PaginateButtons>
    )
}

export default PaginateButtonsContainer;
