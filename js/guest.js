import { util } from './util.js';
import { audio } from './audio.js';
import { theme } from './theme.js';
import { session } from './session.js';
import { storage } from './storage.js';
import { confetti } from './confetti.js';

export const guest = (() => {

    const countDownDate = () => {
        const until = document.getElementById('count-down').getAttribute('data-time').replace(' ', 'T');
        const count = (new Date(until)).getTime();

        setInterval(() => {
            const distance = count - (new Date()).getTime();

            document.getElementById('day').innerText = Math.floor(distance / (1000 * 60 * 60 * 24));
            document.getElementById('hour').innerText = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            document.getElementById('minute').innerText = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            document.getElementById('second').innerText = Math.floor((distance % (1000 * 60)) / 1000);
        }, 1000);
    };

    const animation = () => {
        const duration = 15 * 1000;
        const animationEnd = Date.now() + duration;
        const colors = ["#FFC0CB", "#FF1493", "#C71585"];

        const randomInRange = (min, max) => {
            return Math.random() * (max - min) + min;
        };

        const heart = confetti.shapeFromPath({
            path: 'M167 72c19,-38 37,-56 75,-56 42,0 76,33 76,75 0,76 -76,151 -151,227 -76,-76 -151,-151 -151,-227 0,-42 33,-75 75,-75 38,0 57,18 76,56z',
            matrix: [0.03333333333333333, 0, 0, 0.03333333333333333, -5.566666666666666, -5.533333333333333]
        });

        (function frame() {
            const timeLeft = animationEnd - Date.now();

            colors.forEach((color) => {
                confetti({
                    particleCount: 1,
                    startVelocity: 0,
                    ticks: Math.max(50, 75 * (timeLeft / duration)),
                    origin: {
                        x: Math.random(),
                        y: Math.abs(Math.random() - (timeLeft / duration)),
                    },
                    zIndex: 1057,
                    colors: [color],
                    shapes: [heart],
                    drift: randomInRange(-0.5, 0.5),
                    gravity: randomInRange(0.5, 1),
                    scalar: randomInRange(0.5, 1),
                });
            });

            if (timeLeft > 0) {
                requestAnimationFrame(frame);
            }
        })();
    };

    const open = (button, lang) => {
        button.disabled = true;
        confetti({
            origin: { y: 1 },
            zIndex: 1057
        });

        document.body.style.overflowY = 'scroll';
        document.body.scrollIntoView({ behavior: 'instant' });
        util.opacity('welcome', 0.025);

        audio.play();
        audio.showButton();

        theme.showButtonChangeTheme();
        setTimeout(animation, 1500);

        sessionStorage.setItem('lang', lang);
        updateContent(lang);
    };

    const updateContent = (lang) => {
        document.body.classList.remove('lang-ko', 'lang-th', 'lang-en');
        document.body.classList.add(`lang-${lang}`);

        if (lang === 'ko') {
            document.title = '이영노 ♥️ 잉(Eng) 결혼식에 초대합니다.';
        } else if (lang === 'th') {
            document.title = 'ขอเชิญร่วมงานแต่งงานของ ยองโน ลี ♥️ อิง(Eng)';
        } else if (lang === 'en') {
            document.title = 'You are invited to the wedding of Youngno Lee ♥️ Eng';
        }

        document.getElementById('countdown-day-label').innerText = langLabels[lang].day;
        document.getElementById('countdown-hour-label').innerText = langLabels[lang].hour;
        document.getElementById('countdown-minute-label').innerText = langLabels[lang].minute;
        document.getElementById('countdown-second-label').innerText = langLabels[lang].second;
    };

    const langLabels = {
        'ko': { day: '일', hour: '시', minute: '분', second: '초' },
        'th': { day: 'วัน', hour: 'ชั่วโมง', minute: 'นาที', second: 'วินาที' },
        'en': { day: 'Days', hour: 'Hours', minute: 'Minutes', second: 'Seconds' }
    };

    const init = () => {
        const lang = sessionStorage.getItem('lang') || 'ko';
        updateContent(lang);

        const info = document.getElementById('information');
        if (info && storage('information').get('info')) {
            info.remove();
        }

        if ((document.body.getAttribute('data-key') ?? '').length === 0) {
            const comment = document.getElementById('comment');
            if (comment) {
                comment.remove();
            }

            const nav = document.querySelector('a.nav-link[href="#comment"]');
            if (nav) {
                const item = nav.closest('li.nav-item');
                if (item) {
                    item.remove();
                }
            }

            return;
        }

        countDownDate();
        session.guest();
    };

    return {
        init,
        open,
    };
})();