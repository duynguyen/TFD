(function() {
    'use strict';

    angular
        .module('lumx.radio-button', [])
        .directive('lxRadioGroup', lxRadioGroup)
        .directive('lxRadioButton', lxRadioButton)
        .directive('lxRadioButtonLabel', lxRadioButtonLabel)
        .directive('lxRadioButtonHelp', lxRadioButtonHelp);

    function lxRadioGroup()
    {
        var directive =
        {
            restrict: 'E',
            templateUrl: 'radio-group.html',
            transclude: true
        };

        return directive;
    }

    function lxRadioButton()
    {
        var directive =
        {
            restrict: 'E',
            templateUrl: 'radio-button.html',
            scope: {
                name: '@',
                value: '@?',
                ngModel: '=',
                ngValue: '=?',
                ngChange: '&?',
                ngDisabled: '=?',
                lxColor: '@?'
            },
            controller: LxRadioButtonController,
            controllerAs: 'vm',
            bindToController: true,
            transclude: true
        };

        return directive;
    }

    LxRadioButtonController.$inject = ['LxUtils'];

    function LxRadioButtonController(LxUtils)
    {
        var vm = this;

        //
        // PRIVATE ATTRIBUTES
        //

        var _radioButtonId;
        var _radioButtonHasChildren;

        //
        // PUBLIC ATTRIBUTES
        //

        // Public methods
        vm.getRadioButtonId = getRadioButtonId;
        vm.getRadioButtonHasChildren = getRadioButtonHasChildren;
        vm.setRadioButtonId = setRadioButtonId;
        vm.setRadioButtonHasChildren = setRadioButtonHasChildren;

        //
        // PRIVATE METHODS
        //

        /**
         * Initialize the controller
         */
        function _init()
        {
            setRadioButtonId(LxUtils.generateUUID());
            setRadioButtonHasChildren(false);

            if (angular.isDefined(vm.value) && angular.isUndefined(vm.ngValue))
            {
                vm.ngValue = vm.value;
            }

            vm.lxColor =  angular.isUndefined(vm.lxColor) ? 'accent' : vm.lxColor;
        }

        //
        // PUBLIC METHODS
        //

        function getRadioButtonId()
        {
            return _radioButtonId;
        }

        function getRadioButtonHasChildren()
        {
            return _radioButtonHasChildren;
        }

        function setRadioButtonId(radioButtonId)
        {
            _radioButtonId = radioButtonId;
        }

        function setRadioButtonHasChildren(radioButtonHasChildren)
        {
            _radioButtonHasChildren = radioButtonHasChildren;
        }

        //
        // INITIALIZATION
        //

        _init();
    }

    function lxRadioButtonLabel()
    {
        var directive =
        {
            restrict: 'AE',
            require: ['^lxRadioButton', '^lxRadioButtonLabel'],
            templateUrl: 'radio-button-label.html',
            link: link,
            controller: LxRadioButtonLabelController,
            controllerAs: 'vm',
            bindToController: true,
            transclude: true,
            replace: true
        };

        return directive;

        function link(scope, element, attrs, ctrls)
        {
            ctrls[0].setRadioButtonHasChildren(true);
            ctrls[1].setRadioButtonId(ctrls[0].getRadioButtonId());
        }
    }

    function LxRadioButtonLabelController()
    {
        var vm = this;

        //
        // PRIVATE ATTRIBUTES
        //

        var _radioButtonId;

        //
        // PUBLIC ATTRIBUTES
        //

        // Public methods
        vm.getRadioButtonId = getRadioButtonId;
        vm.setRadioButtonId = setRadioButtonId;

        //
        // PUBLIC METHODS
        //

        function getRadioButtonId()
        {
            return _radioButtonId;
        }

        function setRadioButtonId(radioButtonId)
        {
            _radioButtonId = radioButtonId;
        }
    }

    function lxRadioButtonHelp()
    {
        var directive =
        {
            restrict: 'AE',
            require: '^lxRadioButton',
            templateUrl: 'radio-button-help.html',
            transclude: true,
            replace: true
        };

        return directive;
    }
})();
