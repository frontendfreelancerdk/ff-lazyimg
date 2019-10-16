import {Component, OnInit} from '@angular/core';
import {HttpService} from './shared/http.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  readme;
  moduleName = 'lazyimg';
  public images = [{
    order: 1,
    src: 'https://picsum.photos/900/500?random&t=5',
    srcByBreakpoint: [{600: 'https://picsum.photos/900/500?random&t=5'}, {1200: 'https://picsum.photos/900/500?random&t=6'}],
    srcset: '!',
    load: false,
    imageConfig: {
      dimensions: {
        width: 1920,
        height: 543
      },
    },
    /*   style: {
         width: '60px',
         height: '60px'
       }*/
  },
    {
      order: 1,
      src: 'https://picsum.photos/900/500?random&t=4',
      srcset: '!',
      load: false,
      name: 'lala',

      /*  style: {
          width: '100%',
          height: '60px'
        }*/
    },
    {
      order: 1,
      src: 'https://picsum.photos/900/500?random&t=3',
      srcset: '!',
      load: true,
      /*
            style: {
              width: '60px',
              height: '60px'
            }*/
    }];
  public insertedImages = [];
  public imageWithLoadInConf = [{
    order: 1,
    src: 'https://picsum.photos/900/500?random&t=1',
    srcset: '',
    load: false/*,
    style: {
      width: '60px',
      height: '60px'
    }*/
  }];
  public image = {
    order: 1,
    src: 'https://picsum.photos/900/500?random&t=2',
    srcset: '',
    load: false,
    imageConfig: {
      dimensions: {
        ratio: 0.5
      },
    }/*,
    style: {
      width: '60px',
      height: '60px'
    }*/
  };

  constructor(private http: HttpService) {
  }

  imageLoaded(e) {
    console.log('the image was loaded', e);
  }

  imageInserted(e) {
    console.log('the image was inserted', e);
  }


  updateConfLoadImage(item) {
    let ne = JSON.parse(JSON.stringify(item));
    ne.load = true;
    this.image = ne;//Object.assign(this.image, {load: true});
  }

  triggerChange(item) {
    item.load = !item.load;
  }

  updateConfLoad(item) {
    const newItem = Object.assign({}, item);//JSON.parse(JSON.stringify(item));
    newItem.load = !item.load;
    this.imageWithLoadInConf = [newItem];
  }

  ngOnInit() {
/*    this.http.getReadme(this.moduleName).subscribe((readme) => {
      this.readme = readme;
    });*/
    window.setTimeout(() => {
      this.insertedImages.push({
        order: 1,
        src: 'https://picsum.photos/900/500?random&t=7',
        srcset: '!'
      });
    }, 2000);
  }

  trackFn(index, item) {

    return index;
  }

}
