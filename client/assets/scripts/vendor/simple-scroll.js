export default {
    settings: {
        duration: 50,
        minSpeed: 3,
        maxSpeed: 15,
    },
    setSettings(opts = {duration: this.settings.duration, minSpeed: this.settings.minSpeed, maxSpeed: this.settings.maxSpeed}) {
        this.settings.duration = opts.duration;
        this.settings.minSpeed = opts.minSpeed > 1 ? opts.minSpeed : 1;
        this.settings.maxSpeed = opts.maxSpeed;
    },
    px(pixels, duration = this.settings.duration){
        if (pixels !== 0) scrollFunc(pixels, duration, this.settings.minSpeed, this.settings.maxSpeed);
    },
    vh(viewportHeight, duration = this.settings.duration){
        const amount = window.innerHeight * (viewportHeight / 100);
        if (amount !== 0) scrollFunc(amount, duration, this.settings.minSpeed, this.settings.maxSpeed);
    },
    vw(viewportWidth, duration = this.settings.duration){
        const amount = window.innerWidth * (viewportWidth / 100);
        if (amount !== 0) scrollFunc(amount, duration, this.settings.minSpeed, this.settings.maxSpeed);
    },
    percent(actualPercent, duration = this.settings.duration){
        const amount = document.body.scrollHeight * (actualPercent / 100);
        if (amount !== 0) scrollFunc(amount, duration, this.settings.minSpeed, this.settings.maxSpeed);
    },
    element(elementById, offset = 0, duration = this.settings.duration) {

        const whereTo = document.getElementById(elementById);
        if (whereTo){
            const amount = whereTo.getBoundingClientRect().top - offset;
            if (amount !== 0) scrollFunc(amount, duration, this.settings.minSpeed, this.settings.maxSpeed);
        }
    },
    toTop(duration = this.settings.duration) {
        const amount = -window.scrollY;
        if (amount !== 0) scrollFunc(amount, duration, this.settings.minSpeed, this.settings.maxSpeed);
    },
    toBottom(duration = this.settings.duration) {
        const amount = document.body.scrollHeight - window.scrollY;
        if (amount !== 0) scrollFunc(amount, duration, this.settings.minSpeed, this.settings.maxSpeed);
    },
    internalLinks() {
        const internalLinks = document.querySelectorAll("a[href^='#']");
        for (let i = 0; i < internalLinks.length; i++) {
            internalLinks[i].addEventListener('click', (e) => {
                e.preventDefault();
                this.element(internalLinks[i].getAttribute('href').split('#')[1], this.settings.duration, this.settings.minSpeed, this.settings.maxSpeed);
            })
        }
    }
}
function scrollFunc(amount, duration = 100, minSpeed = 3, maxSpeed = 15) {
    const initialPos = window.scrollY,
        goal = initialPos + amount;
    let speed;
    if (amount > 0) {
        if (amount / duration <= minSpeed) {speed = minSpeed;}
        else if (amount / duration >= maxSpeed){speed = maxSpeed}
        else {speed = amount / duration;}
        console.log(speed, duration)
        const scrolling = setInterval(() => {
            let currentPos = window.scrollY;
            if (window.scrollY < goal && document.body.scrollHeight - window.innerHeight !== window.scrollY) {
                currentPos += speed;
                window.scrollTo(0, currentPos)
            } else {
                clearInterval(scrolling)
            }
        })
    } else if (amount < 0) {
        if (amount / duration >= -minSpeed) {speed = -minSpeed;}
        else if (amount / duration <= -maxSpeed){speed = -maxSpeed}
        else {speed = amount / duration;}

        const scrolling = setInterval(() => {
            let currentPos = window.scrollY;
            if (currentPos > goal && window.scrollY !== 0) {
                currentPos += speed;
                window.scrollTo(0, currentPos)
            } else {
                clearInterval(scrolling)
            }
        })
    }
}

export const px = function(pixels, duration = 100, minSpeed = null, maxSpeed = null){
    if (pixels !== 0){
        scrollFunc(pixels, duration)
    }
}

export const vh = function(viewportHeight, duration = 100){
    const amount = window.innerHeight * (viewportHeight / 100);
    if (amount !== 0){
        const initialPos = window.scrollY,
            goal = initialPos + amount;
        let speed;
        if (amount / duration <= 3) {speed = 3;}
        else if (amount / duration >= 4) {speed = 4;}
        else {speed = amount / duration;}
        if (amount > 0) {
            const scrolling = setInterval(() => {
                let currentPos = window.scrollY;
                if (window.scrollY < goal && document.body.scrollHeight - window.innerHeight !== window.scrollY) {
                    currentPos += speed;
                    window.scrollTo(0, currentPos)
                } else {
                    clearInterval(scrolling)
                }
            })
        } else if (amount < 0) {
            const scrolling = setInterval(() => {
                let currentPos = window.scrollY;
                if (currentPos > goal && window.scrollY !== 0) {
                    currentPos -= speed;
                    window.scrollTo(0, currentPos)
                } else {
                    clearInterval(scrolling)
                }
            })
        }
    }
}

export const vw = function(viewportWidth, duration = 100){
    lool();
    const amount = window.innerWidth * (viewportWidth / 100);
    if (amount !== 0){
        const initialPos = window.scrollY,
            goal = initialPos + amount;
        let speed;
        if (amount / duration <= 3) {speed = 3;}
        else if (amount / duration >= 4) {speed = 4;}
        else {speed = amount / duration;}
        if (amount > 0) {
            const scrolling = setInterval(() => {
                let currentPos = window.scrollY;
                if (window.scrollY < goal && document.body.scrollHeight - window.innerHeight !== window.scrollY) {
                    currentPos += speed;
                    window.scrollTo(0, currentPos)
                } else {
                    clearInterval(scrolling)
                }
            })
        } else if (amount < 0) {
            const scrolling = setInterval(() => {
                let currentPos = window.scrollY;
                if (currentPos > goal && window.scrollY !== 0) {
                    currentPos -= speed;
                    window.scrollTo(0, currentPos)
                } else {
                    clearInterval(scrolling)
                }
            })
        }
    }
}

export const percent = function(actualPercent, duration = 100){
    const amount = document.body.scrollHeight * (actualPercent / 100);
    if (amount !== 0){
        const initialPos = window.scrollY,
            goal = initialPos + amount;
        let speed;
        if (amount / duration <= 3) {speed = 3;}
        else if (amount / duration >= 4) {speed = 4;}
        else {speed = amount / duration;}
        if (amount > 0) {
            const scrolling = setInterval(() => {
                let currentPos = window.scrollY;
                if (window.scrollY < goal && document.body.scrollHeight - window.innerHeight !== window.scrollY) {
                    currentPos += speed;
                    window.scrollTo(0, currentPos)
                } else {
                    clearInterval(scrolling)
                }
            })
        } else if (amount < 0) {
            const scrolling = setInterval(() => {
                let currentPos = window.scrollY;
                if (currentPos > goal && window.scrollY !== 0) {
                    currentPos -= speed;
                    window.scrollTo(0, currentPos)
                } else {
                    clearInterval(scrolling)
                }
            })
        }
    }
}


export const element = function(elementById, offset = 0, duration = 100){
    const whereTo = document.getElementById(elementById);
    if (whereTo){
        const amount = whereTo.getBoundingClientRect().top - offset;
        if (amount !== 0) {
            const initialPos = window.scrollY,
                goal = initialPos + amount;
            let speed;
            if (amount / duration <= 3) {speed = 3;}
            else if (amount / duration >= 4) {speed = 4;}
            else {speed = amount / duration;}
            if (amount > 0) {
                const scrolling = setInterval(() => {
                    let currentPos = window.scrollY;
                    if (window.scrollY < goal && document.body.scrollHeight - window.innerHeight !== window.scrollY) {
                        currentPos += speed;
                        window.scrollTo(0, currentPos)
                    } else {
                        clearInterval(scrolling)
                    }
                })
            } else if (amount < 0) {
                const scrolling = setInterval(() => {
                    let currentPos = window.scrollY;
                    if (currentPos > goal && window.scrollY !== 0) {
                        currentPos -= speed;
                        window.scrollTo(0, currentPos)
                    } else {
                        clearInterval(scrolling)
                    }
                })
            }
        }
    }
}



export const toTop = function(duration = 100) {
    const amount = -window.scrollY;
    if (amount !== 0){
        const initialPos = window.scrollY,
            goal = initialPos + amount;
        let speed;
        if (amount / duration <= 3) {speed = 3;}
        else if (amount / duration >= 4) {speed = 4;}
        else {speed = amount / duration;}
        if (amount > 0) {
            const scrolling = setInterval(() => {
                let currentPos = window.scrollY;
                if (window.scrollY < goal && document.body.scrollHeight - window.innerHeight !== window.scrollY) {
                    currentPos += speed;
                    window.scrollTo(0, currentPos)
                } else {
                    clearInterval(scrolling)
                }
            })
        } else if (amount < 0) {
            const scrolling = setInterval(() => {
                let currentPos = window.scrollY;
                if (currentPos > goal && window.scrollY !== 0) {
                    currentPos -= speed;
                    window.scrollTo(0, currentPos)
                } else {
                    clearInterval(scrolling)
                }
            })
        }
    }
}

export const toBottom = function(duration = 100) {
    const amount = document.body.scrollHeight - window.scrollY;
    if (amount !== 0){
        const initialPos = window.scrollY,
            goal = initialPos + amount;
        let speed;
        if (amount / duration <= 3) {speed = 3;}
        else if (amount / duration >= 4) {speed = 4;}
        else {speed = amount / duration;}
        if (amount > 0) {
            const scrolling = setInterval(() => {
                let currentPos = window.scrollY;
                if (window.scrollY < goal && document.body.scrollHeight - window.innerHeight !== window.scrollY) {
                    currentPos += speed;
                    window.scrollTo(0, currentPos)
                } else {
                    clearInterval(scrolling)
                }
            })
        } else if (amount < 0) {
            const scrolling = setInterval(() => {
                let currentPos = window.scrollY;
                if (currentPos > goal && window.scrollY !== 0) {
                    currentPos -= speed;
                    window.scrollTo(0, currentPos)
                } else {
                    clearInterval(scrolling)
                }
            })
        }
    }
}

export const internalLinks = function(offset = 0, duration = 100){
    const internalLinks = document.querySelectorAll("a[href^='#']");
    const element = function(elementById, offset = 0, duration = 100){
        const whereTo = document.getElementById(elementById);
        if (whereTo){
            const amount = whereTo.getBoundingClientRect().top - offset;
            if (amount !== 0) {
                const initialPos = window.scrollY,
                    goal = initialPos + amount;
                let speed;
                if (amount / duration <= 3) {speed = 3;}
                else if (amount / duration >= 4) {speed = 4;}
                else {speed = amount / duration;}
                if (amount > 0) {
                    const scrolling = setInterval(() => {
                        let currentPos = window.scrollY;
                        if (window.scrollY < goal && document.body.scrollHeight - window.innerHeight !== window.scrollY) {
                            currentPos += speed;
                            window.scrollTo(0, currentPos)
                        } else {
                            clearInterval(scrolling)
                        }
                    })
                } else if (amount < 0) {
                    const scrolling = setInterval(() => {
                        let currentPos = window.scrollY;
                        if (currentPos > goal && window.scrollY !== 0) {
                            currentPos -= speed;
                            window.scrollTo(0, currentPos)
                        } else {
                            clearInterval(scrolling)
                        }
                    })
                }
            }
        }
    }
    for (let i = 0; i < internalLinks.length; i++) {
        internalLinks[i].addEventListener('click', (e) => {
            e.preventDefault();
            element(internalLinks[i].getAttribute('href').split('#')[1], offset, duration);
            
        })
    }
}