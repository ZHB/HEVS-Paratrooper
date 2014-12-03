function updateScores(therm, egg, bird) 
{
    if(bird !== 0) 
    {
        var inputScore = $('.scoreTotal');
        inputScore.val(parseInt(inputScore.val(), 10) - 3);
    }
    
    if(therm !== 0) 
    {
        var inputScore = $('.nbrThermiques');
        inputScore.val(parseInt(inputScore.val(), 10) + 1);
            
        var inputScore = $('.scoreTotal');
        inputScore.val(parseInt(inputScore.val(), 10) + 1);
    }
    
    if(egg !== 0) 
    {
        var inputScore = $('.nbrOeufsRecuperes');
        inputScore.val(parseInt(inputScore.val(), 10) + 1);
            
        var inputScore = $('.scoreTotal');
        inputScore.val(parseInt(inputScore.val(), 10) + 2);
    }
}