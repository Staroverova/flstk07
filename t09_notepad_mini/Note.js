class Note {
    public function __construct($name, $selector, $content) {
        $this->name = $name;
        $this->selector = $selector;
        $this->content = $content;
        $this->date = date('Y-m-d h:i:s');
    }
    public function getName() { 
      return $this->name; 
    }
    public function getSelector() { 
      return $this->selector; 
    }
    public function setContent($content) { 
      $this->content = $content; 
    }
    public function getContent() { 
      return $this->content; 
    }
    public function getDate() { 
      return $this->date; 
    }
    public function __serialize() : array {
        return [
            "name" => $this->name,
            "selector" => $this->selector,
            "content" => $this->content,
            "date" => $this->date
        ];
    }
    public function __unserialize(array $data) : void  {
        $this->name = $data["name"];
        $this->selector = $data["selector"];
        $this->content = $data["content"];
        $this->date = $data["date"];
    }
    public function __toString() {
        return '<ul><li>date: <b>' . $this->date . '</b></li><li>name: <b>' . $this->name . '</b></li><li>importace: <b>' . $this->selector . '</b></li><li>content: <b>' . $this->content . '</b></li><br></ul>';
    }
}