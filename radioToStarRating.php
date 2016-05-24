<?php
/**
 * arrayTextAdapt : a LimeSurvey plugin to update radio question type to star rating system
 *
 * @author Denis Chenu <denis@sondages.pro>
 * @copyright 2016 Advantages <https://advantages.fr/>
 * @copyright 2016 Denis Chenu <http://www.sondages.pro>

 * @license GPL v3
 * @version 0.0.1
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
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
    }

    public function beforeQuestionRender()
    {
        $oEvent=$this->getEvent();
        if($oEvent->get('type')=="L")
        {
            $oAttributeDisplayColumns=QuestionAttribute::model()->find("qid=:qid AND attribute=:attribute",array(":qid"=>$oEvent->get('qid'),":attribute"=>"display_columns"));
            $oAttributeCssClass=QuestionAttribute::model()->find("qid=:qid AND attribute=:attribute",array(":qid"=>$oEvent->get('qid'),":attribute"=>"cssclass"));

            if( ($oAttributeDisplayColumns && trim($oAttributeDisplayColumns->value)=="star") || ($oAttributeCssClass && (trim($oAttributeCssClass->value)=="starRating")) )
            {
                /* @todo must be fixed for 2.50 */
                $sFontAsset=App()->assetManager->publish(App()->getConfig('rootdir').'/third_party/font-awesome');
                App()->getClientScript()->registerCssFile($sFontAsset. '/css/font-awesome.css');
                App()->clientScript->registerScriptFile(App()->assetManager->publish(dirname(__FILE__) . '/assets/radioToStarRating.js'));
                App()->clientScript->registerCssFile(App()->assetManager->publish(dirname(__FILE__) . '/assets/radioToStarRating.css'));
                App()->clientScript->registerScript("radioToStarRating{$oEvent->get('qid')}","doRadioToStarRating({$oEvent->get('qid')})",CClientScript::POS_END);
                $oEvent->set('class',$oEvent->get('class')." radioToStarRating");

            }
        }
    }
}
