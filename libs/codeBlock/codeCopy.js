// 代码块一键复制

$(function () {
    var $copyIcon = $('<i class="fas fa-copy code_copy" title="Copy code" aria-hidden="true"></i>')
    var $notice = $('<div class="codecopy_notice"></div>')
    $('.code-area').prepend($copyIcon)
    $('.code-area').prepend($notice)
    // “复制成功”字出现
    function copy(text, ctx) {
        if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
            try {
                document.execCommand('copy') // Security exception may be thrown by some browsers.
                $(ctx).prev('.codecopy_notice')
                    .text("Copy successful")
                    .animate({
                        opacity: 1,
                        top: 30
                    }, 450, function () {
                        setTimeout(function () {
                            $(ctx).prev('.codecopy_notice').animate({
                                opacity: 0,
                                top: 0
                            }, 650)
                        }, 400)
                    })
            } catch (ex) {
                $(ctx).prev('.codecopy_notice')
                    .text("Copy failed")
                    .animate({
                        opacity: 1,
                        top: 30
                    }, 650, function () {
                        setTimeout(function () {
                            $(ctx).prev('.codecopy_notice').animate({
                                opacity: 0,
                                top: 0
                            }, 650)
                        }, 400)
                    })
                return false
            }
        } else {
            $(ctx).prev('.codecopy_notice').text("The browser does not support copying")
        }
    }
    // 复制
    $('.code-area .fa-copy').on('click', function () {
        var selection = window.getSelection()
        var range = document.createRange()
        range.selectNodeContents($(this).siblings('pre').find('code')[0])
        selection.removeAllRanges()
        selection.addRange(range)
        var text = selection.toString()
        copy(text, this)
        selection.removeAllRanges()
    })
});
