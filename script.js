Enter/* =========================================
   WestGate
   JavaScript
========================================= */


/* -----------------------------------------
   السنة الحالية
----------------------------------------- */

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}



/* -----------------------------------------
   مشاركة الموقع
----------------------------------------- */

const shareButton = document.getElementById("shareButton");

const toast = document.getElementById("toast");


/**
 * عرض رسالة التنبيه (Toast)
 * @param {string} message - النص المراد عرضه
 */
function showToast(message) {

    if (!toast) {
        return;
    }

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(function () {

        toast.classList.remove("show");

    }, 2200);
}


async function shareWebsite() {

    const shareData = {
        title: "WestGate 🌍🚪",
        text: "معلومات ونصائح حول الهجرة والسفر والتأشيرات.",
        url: window.location.href
    };


    /*
     * إذا كان الجهاز يدعم المشاركة
     */
    if (navigator.share) {

        try {

            await navigator.share(shareData);

        } catch (error) {
            /*
             * المستخدم أغلق نافذة المشاركة.
             * لا نحتاج إلى فعل شيء.
             */
        }

        return;
    }


    /*
     * استخدام Clipboard API الحديثة بدلاً من الطريقة القديمة
     */
    try {

        await navigator.clipboard.writeText(
            window.location.href
        );

        showToast("تم نسخ رابط الموقع ✓");

    } catch (error) {

        showToast(
            "يمكنك نسخ رابط الموقع من شريط المتصفح"
        );

    }
}


if (shareButton) {

    shareButton.addEventListener(
        "click",
        shareWebsite
    );

}
