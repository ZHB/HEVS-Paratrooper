/**
 * Used to calculate scores and to diplay on the top bar
 * 
 * @param int therm
 * @param int egg
 * @param int bird
 * @returns null
 */
function updateScores(therm, egg, bird) 
{
    if(bird !== 0) 
    {
        var inputScore = $('.scoreTotal');
        inputScore.val(parseInt(inputScore.val(), 10) - 10);
    }
    
    if(therm !== 0) 
    {
        var inputScore = $('.nbrThermiques');
        inputScore.val(parseInt(inputScore.val(), 10) + 1);
            
        var inputScore = $('.scoreTotal');
        inputScore.val(parseInt(inputScore.val(), 10) + 0);
    }
    
    if(egg !== 0) 
    {
        var inputScore = $('.nbrOeufsRecuperes');
        inputScore.val(parseInt(inputScore.val(), 10) + 1);
            
        var inputScore = $('.scoreTotal');
        inputScore.val(parseInt(inputScore.val(), 10) + 5);
    }
}