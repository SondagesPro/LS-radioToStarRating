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
 * Update answers part for Star rating (single radio question)
 *
 * @author Denis Chenu (Shnoulle)
 * @param {number} qId The qid of the question where apply.
 */
function doRadioToStarRating(qID) {

  //~ // Return quick
  var answersList=$('#question'+qID+' input.radio').closest('.radio-list:not(.starred-list)');
  if(!answersList){return;}

  var asNoAnswer=$('#question'+qID+' .noanswer-item .radio, #question'+qID+' .no-anwser-item input:radio').length;
  var starsHtmlElement="<div class='radiostars-list answers-list noread' aria-hidden='true'>";
  if(asNoAnswer){ starsHtmlElement= starsHtmlElement+"<div class='radiostar-rating radiostar-cancel fa fa-ban' data-value='' title='"+$('#question'+qID+' .noanswer-item label').html()+"'></div>";}
  $('#question'+qID+' input.radio').each(function(){
    if($(this).attr("value").trim()!=""){
      if($("[id='label-"+$(this).attr('id')+"']").length){
        var title=$("[id='label-"+$(this).attr('id')+"']").text().trim();
      } else {
        var title=$("label[for='"+$(this).attr('id')+"']").text().trim();
      }
      starsHtmlElement= starsHtmlElement+"<div class='radiostar-rating radiostar radiostar-"+$(this).attr('value')+" fa fa-star-o' data-value='"+$(this).attr('value')+"' title='"+title+"'></div>";
    }
  });
  starsHtmlElement= starsHtmlElement+"</div>";
  $(answersList).last().after(starsHtmlElement);

  var starsElement=$('#question'+qID+' .radiostars-list');
  /* Mouse out / in class update */
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
  /* Click on star events */
  starsElement.on("click", ".radiostar", function(event){
    var thisnum=$(this).index();
    var thischoice=$(this).data("value");
    answersList.find("input.radio[value='"+thischoice+"']").click();
  });
  starsElement.on("click", ".radiostar-cancel", function(event){
    answersList.find("input.radio[value='']").click();
  });

  $('#question'+qID+' .answers-list.radio-list').addClass("starred-list hide sr-only");
  /* Select actual value */
  var openValue=answersList.find("input:radio:checked").val();
  if(answersList.find("input:radio:checked").length && openValue!=""){
    var checkedElement=starsElement.find(".radiostar[data-value='"+openValue+"']");
    var thisnum=starsElement.find(".radiostar").index(checkedElement);
    starsElement.children('.radiostar:lt('+thisnum+')').removeClass("fa-star-o").addClass("radiostar-rated fa-star");
    starsElement.children('.radiostar:eq('+thisnum+')').removeClass("fa-star-o").addClass("radiostar-rated fa-star radiostar-rated-on");
  }
  /* event by updating radio */
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

/**
 * Update answers part for Star rating (array dropdown question)
 *
 * @author Denis Chenu (Shnoulle)
 * @param {number} qId The qid of the question where apply.
 */
function doArrayToStarRating(qID) {
  //~ // Return quick
  var answersItems=$('#question'+qID+' .dropdown-item:not(.starred-item)');
  if(!answersItems){return;}
  var asNoAnswer=$('#question'+qID+' .asterisk:not(:empty)').length; // Unsure
  $(answersItems).each(function(){
    var dropdownItem=$(this).find("select");
    var starsHtmlElement="<div class='radiostars-list answers-list noread' aria-hidden='true'>";
    $(this).find("option").each(function(){
      if($(this).attr("value").trim()!=""){
        starsHtmlElement= starsHtmlElement+"<div class='radiostar-rating radiostar radiostar-"+$(this).attr('value')+" fa fa-star-o' data-value='"+$(this).attr('value')+"' title='"+$(this).text().trim()+"'></div>";
      }
    });
    starsHtmlElement= starsHtmlElement+"</div>";
    $(this).find("select").after(starsHtmlElement);
    var starsElement=$(this).find('.radiostars-list');

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
    /* Click on star events */
    starsElement.on("click", ".radiostar", function(event){
      var thisnum=$(this).index();
      var thischoice=$(this).data("value");
      $(dropdownItem).val(thischoice).trigger('change');
    });
    starsElement.on("click", ".radiostar-cancel", function(event){
      $(dropdownItem).val("").trigger('change');
    });
    $(this).addClass("starred-item");
    $(dropdownItem).addClass("hide sr-only");
    /* Select actual value */
    var openValue=$(dropdownItem).val();
    if(openValue!=""){
      var checkedElement=starsElement.find(".radiostar[data-value='"+openValue+"']");
      var thisnum=starsElement.find(".radiostar").index(checkedElement);
      starsElement.children('.radiostar:lt('+thisnum+')').removeClass("fa-star-o").addClass("radiostar-rated fa-star");
      starsElement.children('.radiostar:eq('+thisnum+')').removeClass("fa-star-o").addClass("radiostar-rated fa-star radiostar-rated-on");
    }
    /* event by updating dropdown */
    $(document).on("change",dropdownItem,function(){
      var openValue=$(dropdownItem).val();
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
  });
}
