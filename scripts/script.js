  var DragAndDrop = (function (DragAndDrop) {

    function shouldAcceptDrop(item) {

        var $target = $(this).closest("li");
        var $item = item.closest("li");

        if ($.contains($item[0], $target[0])) {
            // can't drop on one of your children!
            return false;
        }

        return true;

    }

    function itemOver(event, ui) {
    }

    function itemOut(event, ui) {
    }

    function itemDropped(event, ui) {

        var $target = $(this).closest("li");
        var $item = ui.draggable.closest("li");
        
        var $srcUL = $item.parent("ul");
        var $dstUL = $target.children("ul").first();

        // destination may not have a UL yet
        if ($dstUL.length == 0) {
            $dstUL = $("<ul></ul>");
            $target.append($dstUL);
        }

        $item.slideUp(50, function() {

          $dstUL.append($item);
  
          if ($srcUL.children("li").length == 0) {
              $srcUL.remove();
          }
          
          $item.slideDown(50, function() {
            $item.css('display', '');
          });

        });

    }

    DragAndDrop.enable = function (selector) {

        $(selector).find(".node-cpe").draggable({
            helper: "clone"
        });

        $(selector).find(".node-cpe, .node-facility").droppable({
            activeClass: "active",
            hoverClass: "hover",
            accept: shouldAcceptDrop,
            over: itemOver,
            out: itemOut,
            drop: itemDropped,
            greedy: true,
            tolerance: "pointer"
        });

    };

    return DragAndDrop;

})(DragAndDrop || {});

(function ($) {
  
  $.fn.beginEditing = function(whenDone) {
    
    if (!whenDone) { whenDone = function() { }; }
    
    var $node = this;
    var $editor = $("<input type='text' style='width:auto; min-width: 25px;'></input>");
    var currentValue = $node.text();
    
    function commit() {
      $editor.remove();
      $node.text($editor.val());
      whenDone($node);
    }
    
    function cancel() {
      $editor.remove();
      $node.text(currentValue);
      whenDone($node);
    }
    
    $editor.val(currentValue);
    $editor.blur(function() { commit(); });
    $editor.keydown(function(event) {
      if (event.which == 27) { cancel(); return false; }
      else if (event.which == 13) { commit(); return false; }
    });

    $node.empty();
    $node.append($editor);
    $editor.focus();
    $editor.select();
    
  };
  
})(jQuery);

$(function () {
  DragAndDrop.enable("#dragRoot");
 
});
  $(document).ready(
    function() {
        $("#teama").click(function() {
              $("#TEAM1").show();
              $("#TEAM2").hide();
              $("#TEAM3").hide(); 
              $("#allteam").show();           
        });
        $("#teamb").click(function() {
             $("#TEAM1").hide();
              $("#TEAM2").show();
              $("#TEAM3").hide();
              $("#allteam").show();
        });
         $("#teamc").click(function() {
            $("#TEAM1").hide();
              $("#TEAM2").hide();
              $("#TEAM3").show();
              $("#allteam").show();
        });  
          $("#allteam").click(function() {
            $("#TEAM1").show();
              $("#TEAM2").show();
              $("#TEAM3").show();
              $("#allteam").hide();
        });         
    });
