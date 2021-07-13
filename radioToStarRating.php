<?php
/**
 * radioToStarRating : a LimeSurvey plugin to update radio question type to star rating system
 *
 * @author Denis Chenu <denis@sondages.pro>
 * @copyright 2016-2021 Denis Chenu <http://www.sondages.pro>
 * @copyright 2016 Advantages <https://advantages.fr/>
 * @copyright 2017 Réseaux en scène <https://www.reseauenscene.fr/>
 * @license AGPL v3
 * @version 2.2.1
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 */

class radioToStarRating extends PluginBase {
    static protected $description = 'Use any radio question type to star rating.';
    static protected $name = 'radioToStarRating';

    public function init()
    {
        $this->subscribe('beforeQuestionRender');
        $this->subscribe('newQuestionAttributes','addStarRatingAttribute');
    }

    public function beforeQuestionRender()
    {
        if (!$this->getEvent()) {
            throw new CHttpException(403);
        }
        $oEvent=$this->getEvent();
        if($oEvent->get('type')=="L")
        {
            $oAttributeDisplayColumns=QuestionAttribute::model()->find("qid=:qid AND attribute=:attribute",array(":qid"=>$oEvent->get('qid'),":attribute"=>"display_columns"));
            $oAttributeCssClass=QuestionAttribute::model()->find("qid=:qid AND attribute=:attribute",array(":qid"=>$oEvent->get('qid'),":attribute"=>"cssclass"));
            $oAttributeStarRating=QuestionAttribute::model()->find('qid=:qid and attribute=:attribute',array(':qid'=>$this->getEvent()->get('qid'),':attribute'=>'radioToStarRating'));
            if( ($oAttributeStarRating && $oAttributeStarRating->value) || ($oAttributeDisplayColumns && trim($oAttributeDisplayColumns->value)=="star") || ($oAttributeCssClass && (trim($oAttributeCssClass->value)=="starRating")) )
            {
                $this->registerNeededAssets();
                App()->clientScript->registerScript("radioToStarRating{$oEvent->get('qid')}","doRadioToStarRating({$oEvent->get('qid')})",CClientScript::POS_END);
                $oEvent->set('class',$oEvent->get('class')." radioToStarRating");
            }
        }
        if($oEvent->get('type')=="F") {
            $oAttributeStarRating=QuestionAttribute::model()->find('qid=:qid and attribute=:attribute',array(':qid'=>$this->getEvent()->get('qid'),':attribute'=>'radioToStarRating'));
            $oAttributeUseDropDown=QuestionAttribute::model()->find('qid=:qid and attribute=:attribute',array(':qid'=>$this->getEvent()->get('qid'),':attribute'=>'use_dropdown'));
            if($oAttributeStarRating && $oAttributeStarRating->value && $oAttributeUseDropDown && $oAttributeUseDropDown->value) {
                $this->registerNeededAssets();
                /* Must find if we must show no answer or not */
                $oQuestion=Question::model()->findByPk(array("qid"=>$oEvent->get('qid'),'language'=>App()->getLanguage()));
                $showNoAnswer= intval($oQuestion->mandatory!='Y' && SHOW_NO_ANSWER == 1);
                if($showNoAnswer){
                    $showNoAnswer=json_encode(gT('No answer'));
                }
                App()->clientScript->registerScript("arrayToStarRating{$oEvent->get('qid')}","doArrayToStarRating({$oEvent->get('qid')},{$showNoAnswer})",CClientScript::POS_END);
                $oEvent->set('class',$oEvent->get('class')." radioToStarRating");
            }
        }
    }

    /**
     * Register needed script and css
     */
    private function registerNeededAssets()
    {
        $this->registerFontAwesome();
        if(LS_Twig_Extension::getTemplateForRessource("scripts/radioToStarRating.js")) {
            LS_Twig_Extension::registerTemplateScript("scripts/radioToStarRating.js");
        } else {
            App()->clientScript->registerScriptFile(App()->assetManager->publish(dirname(__FILE__) . '/assets/radioToStarRating.js'));
        }
        if(LS_Twig_Extension::getTemplateForRessource("scripts/radioToStarRating.css")) {
            LS_Twig_Extension::registerTemplateCssFile("scripts/radioToStarRating.css");
        } else {
            App()->clientScript->registerCssFile(App()->assetManager->publish(dirname(__FILE__) . '/assets/radioToStarRating.css'));
        }
    }
    /**
     * register then Font awesome is not already registered
     */
    private function registerFontAwesome()
    {
        if(!array_key_exists('fontawesome',Yii::app()->getClientScript()->packages)){
            $sFontAsset=App()->assetManager->publish(App()->getConfig('rootdir').'/third_party/font-awesome');
            App()->getClientScript()->registerCssFile($sFontAsset. '/css/font-awesome.css');
        }
    }

    /**
     * Add the question settings
     * @see event newQuestionAttributes
     */
    public function addStarRatingAttribute()
    {
        if (!$this->getEvent()) {
            throw new CHttpException(403);
        }
        $radioToStarRatingAttributes = array(
            'radioToStarRating'=>array(
                'types'=>'LF', /* Radio + Array radio */
                'category'=>gT('Display'),
                'sortorder'=>150,
                'inputtype'=>'switch',
                'default'=>0,
                'help'=>$this->_translate('With array, you need to check use dropdown attribute too.'),
                'caption'=>$this->_translate('Show like a star rating.'),
            ),
        );
        if(method_exists($this->getEvent(),'append')) {
            $this->getEvent()->append('questionAttributes', $radioToStarRatingAttributes);
        } else {
            $questionAttributes=(array)$this->event->get('questionAttributes');
            $questionAttributes=array_merge($questionAttributes,$radioToStarRatingAttributes);
            $this->event->set('questionAttributes',$radioToStarRatingAttributes);
        }
    }

    /**
     * Translate a plugin string
     * @param string $string to translate
     * @return string
     */
    private function _translate($string){
        return Yii::t('',$string,array(),'radioToStarRating');
    }
    /**
     * Add this translation just after loaded all plugins
     * @see event afterPluginLoad
     */
    public function afterPluginLoad(){
        // messageSource for this plugin:
        $messageMaintenanceMode=array(
            'class' => 'CGettextMessageSource',
            'cacheID' => 'radioToStarRatingLang',
            'cachingDuration'=>3600,
            'forceTranslation' => true,
            'useMoFile' => true,
            'basePath' => __DIR__ . DIRECTORY_SEPARATOR.'locale',
            'catalog'=>'messages',// default from Yii
        );
        Yii::app()->setComponent('radioToStarRating',$messageMaintenanceMode);
    }
}
