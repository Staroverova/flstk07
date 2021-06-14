class Comment
    {
        public function __construct($text) {
            $this->text = $text;
            $this->date = date('Y-m-d');
        }
        public function getText(){
            return $this->text;
        }
        public function getDate() {
          return $this->date;
        }
    }