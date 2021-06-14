class NotePad
  {
      public function __construct($notes) {
          $this->notes = $notes;
      }
      public function __serialize() : array {
        $serialize = [];
        foreach ($this->notes as $note)
            array_push($serialize, serialize($note));
        return $serialize;
      }
      public function __unserialize(array $data) : void {
          $this->notes = [];
          if ($data)
              foreach ($data as $note)
                  array_push($this->notes, unserialize($note));
      }
      public function __toString() {
          $str = '<ul>';
          if ($this->notes)
              foreach ($this->notes as $note) {
                  $str .= '<li><a href="?note='. 
                  $note->getName().'">'. 
                  $note->getDate().' > '. 
                  $note->getName().'</a> <a href="?delete='.$note->getName().'">DELETE</a></li>';
              }
          $str .= '</ul>';
          return $str;
      }
      public function getNoteWithName($name) {
          foreach ($this->notes as $note) {
              if ($name == $note->getName()) {
                  return $note;
              }
          }
          return null;
      }
  }