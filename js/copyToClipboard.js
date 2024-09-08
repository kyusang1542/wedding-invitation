function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(function() {
            alert("계좌번호가 복사되었습니다.\n" + text);
        }).catch(function(err) {
            alert("계좌번호 복사에 실패하였습니다.\n계좌번호를 수동으로 복사해주세요.");
        });
    } else {
        try {
            const tempTextArea = document.createElement("textarea");
            tempTextArea.value = text;
            document.body.appendChild(tempTextArea);
            tempTextArea.select();
            tempTextArea.setSelectionRange(0, 99999); // 모바일 환경 지원
            document.execCommand("copy");
            document.body.removeChild(tempTextArea);
            alert("계좌번호가 복사되었습니다.\n" + text);
        } catch (err) {
            alert("계좌번호 복사에 실패하였습니다.\n계좌번호를 수동으로 복사해주세요.");
        }
    }
}
