class Token {
    type: string;
    value: string;

    constructor(type: string, value: string) {
        this.type = type;
        this.value = value;
    }
}

class Lexer {
    text: string;
    pos: number;
    currentChar: string | null;

    constructor(text: string) {
        this.text = text;
        this.pos = 0;
        this.currentChar = this.text[this.pos];
    }

    advance() {
        this.pos++;
        if (this.pos < this.text.length) {
            this.currentChar = this.text[this.pos];
        } else {
            this.currentChar = null;
        }
    }

    skipWhitespace() {
        while (this.currentChar !== null && /\s/.test(this.currentChar)) {
            this.advance();
        }
    }

    integer() {
        let result = '';
        while (this.currentChar !== null && (/[0-9]/.test(this.currentChar) || this.currentChar === '_')) {
            if (this.currentChar !== '_') {
                result += this.currentChar;
            }
            this.advance();
        }
        return parseInt(result, 10);
    }

    skipComment() {
        while (this.currentChar !== '\n' && this.currentChar !== null) {
            this.advance();
        }
        this.advance();
    }

    getNextToken() {
        while (this.currentChar !== null) {
            if (/\s/.test(this.currentChar)) {
                this.skipWhitespace();
                continue;
            }

            if (this.currentChar === '/') {
                if (this.text[this.pos + 1] === '/') {
                    this.skipComment();
                    continue;
                }
            }

            if (/[0-9]/.test(this.currentChar)) {
                return new Token('INTEGER', this.integer().toString());
            }

            if (this.currentChar === '+') {
                this.advance();
                return new Token('PLUS', '+');
            }

            if (this.currentChar === '-') {
                this.advance();
                return new Token('MINUS', '-');
            }

            if (this.currentChar === '*') {
                this.advance();
                return new Token('MULTIPLY', '*');
            }

            if (this.currentChar === '/') {
                this.advance();
                return new Token('DIVIDE', '/');
            }

            if (this.currentChar === ':') {
                this.advance();
                return new Token('COLON', ':');
            }

            if (this.currentChar === ';') {
                this.advance();
                return new Token('SEMI', ';')
            }

            throw new Error(`Invalid character: ${this.pos}`);
        }

        return new Token('EOF', '');
    }
}

export { Lexer, Token };
