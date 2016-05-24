/**
 * @file function to use radio button as star rating
 * @author Denis Chenu
 * @copyright 2016 Advantages <https://advantages.fr/>
 * @copyright 2016 Denis Chenu <http://www.sondages.pro>
 * @license magnet:?xt=urn:btih:d3d9a9a6595521f9666a5e94cc830dab83b65699&dn=expat.txt Expat (MIT)
 */

/*
 * @license This file is part of LimeSurvey
 * See COPYRIGHT.php for copyright notices and details.
 *
 */

/**
 * Update answers part for Star rating
 *
 * @author Denis Chenu (Shnoulle)
 * @param {number} qId The qid of the question where apply.
 */
function doRadioToStarRating(qID) {

  //~ // Return quick
  var answersList=$('#question'+qID+' input.radio').closest('.radio-list:not(.starred-list)');
  if(!answersList){return;}
//~ console.log(answersList);
  //~ return;
  //~ // See to http://www.visualjquery.com/rating/rating_redux.html
  if ((!$.support.opacity && !$.support.style)) try { document.execCommand("BackgroundImageCache", false, true)} catch(e) { };

  var asNoAnswer=$('#question'+qID+' .noanswer-item input.radio').length;
  var starsHtmlElement="<div class='radiostars-list answers-list noread' aria-hidden='true'>";
  if(asNoAnswer){ starsHtmlElement= starsHtmlElement+"<div class='radiostar-rating radiostar-cancel fa fa-ban' data-value='' title='"+$('#question'+qID+' .noanswer-item label').html()+"'></div>";}
  $('#question'+qID+' input.radio').each(function(){
    if($(this).attr("value").trim()!=""){
      starsHtmlElement= starsHtmlElement+"<div class='radiostar-rating radiostar radiostar-"+$(this).attr('value')+" fa fa-star-o' data-value='"+$(this).attr('value')+"' title='"+$("label[for='"+$(this).attr('id')+"']").text()+"'></div>";
    }
  });
  starsHtmlElement= starsHtmlElement+"</div>";
  $(answersList).last().after(starsHtmlElement);

  var starsElement=$('#question'+qID+' .radiostars-list');
  starsElement.on("mouseout mouseover", ".radiostar", function(event){
    var thisnum=$(this).index();
    if(asNoAnswer){thisnum--};
    if(event.type=='mouseover'){
      starsElement.children('.radiostar:lt('+thisnum+')').removeClass("fa-star-o").addClass("radiostar-drained fa-star");
      starsElement.children('.radiostar:eq('+thisnum+')').removeClass("fa-star-o").addClass("radiostar-drained radiostar-hover fa-star");
      starsElement.children('.radiostar:gt('+thisnum+')').removeClass("fa-star").addClass("fa-star-o");

    }else{
      starsElement.children('.radiostar:lt('+thisnum+')').removeClass("radiostar-drained");
      starsElement.children('.radiostar:eq('+thisnum+')').removeClass("radiostar-drained radiostar-hover");
      starsElement.children('.radiostar').addClass('fa-star-o');
      starsElement.children('.radiostar-rated').removeClass("fa-star-o").addClass('fa-star');

    }
  });
  starsElement.on("click", ".radiostar", function(event){
    var thisnum=$(this).index();
    var thischoice=$(this).data("value");
    answersList.find("input.radio[value='"+thischoice+"']").click();
    //~ starsElement.children('.radiostar:lt('+thisnum+')').removeClass("fa-star-o").addClass("radiostar-rated fa-star");
    //~ starsElement.children('.radiostar:eq('+thisnum+')').removeClass("fa-star-o").addClass("radiostar-rated radiostar-rated-on fa-star");
    //~ starsElement.children('.radiostar:gt('+thisnum+')').removeClass("radiostar-rated fa-star radiostar-rated-on").addClass("fa-star-o")

  });
  starsElement.on("click", ".radiostar-cancel", function(event){
    //~ starsElement.children('.radiostar').removeClass("radiostar-rated fa-star").addClass("fa-star-o")
    answersList.find("input.radio[value='']").click();
  });
  $('#question'+qID+' .answers-list.radio-list').addClass("starred-list hide sr-only");
  var openValue=answersList.find("input:radio:checked").val();
  if(answersList.find("input:radio:checked").length && openValue!=""){
    var checkedElement=starsElement.find(".radiostar[data-value='"+openValue+"']");
    var thisnum=starsElement.find(".radiostar").index(checkedElement);
    starsElement.children('.radiostar:lt('+thisnum+')').removeClass("fa-star-o").addClass("radiostar-rated fa-star");
    starsElement.children('.radiostar:eq('+thisnum+')').removeClass("fa-star-o").addClass("radiostar-rated fa-star radiostar-rated-on");
  }
  $(document).on("click",'#question'+qID+' .answers-list input.radio',function(){
    var openValue=$(this).attr("value");
    if(openValue!=""){
      var checkedElement=starsElement.find(".radiostar[data-value='"+openValue+"']");
      var thisnum=starsElement.find(".radiostar").index(checkedElement);
      starsElement.children('.radiostar:lt('+thisnum+')').removeClass("fa-star-o radiostar-rated-on").addClass("radiostar-rated fa-star");
      starsElement.children('.radiostar:eq('+thisnum+')').removeClass("fa-star-o").addClass("radiostar-rated fa-star radiostar-rated-on");
      starsElement.children('.radiostar:gt('+thisnum+')').removeClass("radiostar-rated fa-star radiostar-rated-on").addClass("fa-star-o")
    }else{
      starsElement.children('.radiostar').removeClass("radiostar-rated  fa-star radiostar-rated-on").addClass("fa-star-o");
    }
  });
}
