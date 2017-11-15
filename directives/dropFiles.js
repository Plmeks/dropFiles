angular.module('app.directives.dropFiles', [])
.directive('dropFiles', function() {
    return {
        restrict: 'E',
        scope: {
            test: '='
        },
        templateUrl: 'templates/dropFiles.html',
        controller: function($scope, $element, $attrs) {
            // var dropZone = angular.element($element[0].querySelector('#dropFiles'));
            var dropZone = $element.parent().find("#dropFiles");

            dropZone.bind('drop', function(event) {
                event.preventDefault();

                var filesObject = [];
                event.dataTransfer = event.originalEvent.dataTransfer;
                angular.forEach(event.dataTransfer.files, file => {
                    var reader = new FileReader();
                    reader.onload = function(event) {
                        $scope.$apply(function() {
                            filesObject.push({
                                name: file.name
                            });
                        });
                    };
                    reader.readAsDataURL(file);
                    console.log(reader);
                });
                
                $scope.files = filesObject;
                dropZone.removeClass('over');
            });

            dropZone.bind('dragenter', function(event) {
                event.preventDefault();

                event.dataTransfer = event.originalEvent.dataTransfer;
                event.dataTransfer.effectAllowed = 'copy';
                dropZone.addClass('over');
            });
            
            dropZone.bind('dragover', function(event) {
                event.preventDefault();

                event.dataTransfer = event.originalEvent.dataTransfer;
                event.dataTransfer.effectAllowed = 'copy';
                dropZone.addClass('over');
            });

            dropZone.bind('dragleave', function(event) {
                event.preventDefault();
                dropZone.removeClass('over');
            });
        }
    };
});