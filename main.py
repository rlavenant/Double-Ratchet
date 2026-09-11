from PyQt6.QtWidgets import QApplication, QWidget, QGridLayout, QLabel
from PyQt6.QtGui import QPixmap
import sys

class MainWin(QWidget) :
    def __init__(self):
        super().__init__()

        self.layout = QGridLayout()
        self.setLayout(self.layout)

        image = QPixmap("Rochet.png")

        label = QLabel()
        label.setPixmap(image)

        self.layout.addWidget(label)

        self.etape = 0
    
    def keyPressEvent(self):
        pass


    

if __name__ == "__main__":
    app = QApplication(sys.argv)
    win = MainWin()
    win.show()
    app.exec()