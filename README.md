# radioToStarRating #

A plugin for LimeSurvey to set any radio list to star rating system, or use another character.

## Installation

### Via GIT
- Go to your LimeSurvey Directory (version up to 2.05)
- Clone with Submodule in plugins/radioToStarRating directory : `git clone https://git.framasoft.org/SondagePro-LimeSurvey-plugin/radioToStarRating.git radioToStarRating`

### Via ZIP dowload
- Download <http://extensions.sondages.pro/IMG/auto/radioToStarRating.zip>
- Extract : `unzip radioToStarRating.zip`
- Move the directory to plugins/ directory inside LimeSUrvey

## Documentation

The plugin can be activated for List (Radio) question type and Array question type. With Array question type: you must set 'Use dropdown presentation' to yes.

### Adaptation

The plugin is used to show star, using [FontAwesome icon](http://fontawesome.io/icons/). You can use css to use your own icon or character.

This plugin use different class:
- The question wrapper (`{QUESTION_CLASS}`) have `radioToStarRating` class
- The radio group have `radiostars-list` class
- Each start item have `radiostar-rating` class
- No answer item have class `radiostar-cancel fa fa-ban` class
- Items have `radiostar radiostar-value fa fa-star-o` class, where value is replaced by the answer code.
- Checked item have `radiostar-rated fa-star radiostar-rated-on` class
- Item before checked item have `radiostar-rated fa-star` class
- Hovered item have `radiostar-drained radiostar-hover fa-star` class
- Item before hovered item have `radiostar-drained fa-star` class

Then you can update the default style using this class, some example :

1. Add a Not-applicable item before the star (code is NA)

        .radiostar-NA:before {
          content: "#";
        }
        .radiostar-NA.radiostar,.radiostar-NA.radiostar-rated{
          color:#ccc;opacity:0.5;
        }
        .radiostar-NA.radiostar-hover{
          color:#888;opacity:1;
        }
        .radiostar-NA.radiostar-rated-on{
          color:#444;opacity:1;
        }
2. Use a Yes/No with [thumb up](http://fontawesome.io/icon/thumbs-up/) and [thumb down](http://fontawesome.io/icon/thumbs-down), code as YES and NO.

        .radiostar-NO:before {
          content: "\f165";
        }
        .radiostar-NO.radiostar,.radiostar-NO.radiostar-rated{
          color:#ccc;opacity:0.5;
        }
        .radiostar-NO.radiostar-hover{
          color:#888;opacity:1;
        }
        .radiostar-NO.radiostar-rated-on{
          color:#444;opacity:1;
        }
        .radiostar-YES:before {
          content: "\f164";
        }
        .radiostar-YES.radiostar,.radiostar-YES.radiostar-rated{
          color:#ccc;opacity:0.5;
        }
        .radiostar-YES.radiostar-hover{
          color:#888;opacity:1;
        }
        .radiostar-YES.radiostar-rated-on{
          color:#444;opacity:1;
        }

## Home page & Copyright
- HomePage <http://extensions.sondages.pro/>
- Copyright © 2016-2017 Denis Chenu <http://www.sondages.pro>- Licence : GNU General Public License <https://www.gnu.org/licenses/agpl.html>
- Copyright © 2016 Advantages <https://advantages.fr/>
- Copyright © 2017 Réseaux en scène <https://www.reseauenscene.fr/>

Distributed under [GNU AFFERO GENERAL PUBLIC LICENSE Version 3](http://www.gnu.org/licenses/agpl.txt) licence

This plugin use Font Awesome by Dave Gandy - <http://fontawesome.io>, distributed under [SIL OFL 1.1](http://scripts.sil.org/OFL) and [MIT License](http://opensource.org/licenses/mit-license.html).
