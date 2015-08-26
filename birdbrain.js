var Birdbrain = {};

( function( exports ) {

    'use strict';

    var species;             

    // async so we load early.
    require( ['json!../data/aves.json'], function( data ) {
        species = data;
    });

    // singleton....
    Birdbrain._aves = (function() {

        var instance;

        function init() {
            return species;
        }

        return {

            get:    function( code ) {

                if ( ! instance ) {
                    instance = init();
                }

                return instance;
            }
        };
    })();

    Birdbrain.Db = function() {

        // do stuff for init

    };

    Birdbrain.Db.prototype.band  = function( code ) {

        // get bandcode
        var speciesDb   = Birdbrain._aves.get(),
            result
        ;

        speciesDb.forEach( function( species ) {

            if ( species.bandCode4 === code.toUpperCase() || species.bandCode6 === code.toUpperCase() ) {
                result = species;
            }
        });

        return result;
    };

    // not using node
    if( ! exports ) {
        return;
    }

    module.exports  = {

        Db:     Birdbrain.Db
    };

})( ( typeof exports === 'undefined' ? false : exports ) );
