// listen for click on  a month or party
 $(document).click(function (evt) {
        alert( "Handler for .click() called." );   
        var d = '';
        console.log('hello');
        var $this = $(evt.target);
        var month = $this.context.innerHTML;
        
        switch(month) {
            case 'May':
                d = '5/1/2015';
                break;
            case 'June':
                d = '6/1/2015';
                break;
            case 'July':
                d = '7/1/2015';
                break;
            case 'August':
                d = '8/1/2015';
                break;
            case 'September':
                d = '9/1/2015';
                break;
            case 'October':
                d = '10/1/2015';
                break;
            case 'November':
                d = '11/1/2015';
                break;
            case 'December':
                d = '12/1/2015';
                break;
            case 'January':
                d = '1/1/2016';
                break;
            case 'Febuary':
                d = '2/1/2016';
                break;
            case 'March':
                d = '3/1/2016';
                break;
            default:
                d = '4/1/2016';
                break;
        }
        
        getTweet('c', d)
    });