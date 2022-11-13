import { useNavigate, IconChevron } from '../imports';

const TermsConditions = () => {
  const navigate = useNavigate(); //used to return to previous page
  const goBack = () => navigate(-1);

  return (
    <div className="terms__container">
      <div className="cart__return">
        <button onClick={goBack} className="btn--back">
          <img src={IconChevron} alt="zobacz" />
        </button>
        <h1>Regulamin sklepu</h1>
      </div>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin non
        tristique nibh. Proin posuere nec nibh in tincidunt. Maecenas imperdiet
        vestibulum mi eu faucibus. Donec non maximus tellus, id maximus leo.
        Maecenas accumsan semper venenatis. Nunc in augue porttitor, rutrum est
        vitae, facilisis mauris. Donec condimentum iaculis dignissim. Curabitur
        dignissim magna ac turpis mollis, eget ultricies ipsum ultricies. Morbi
        porta vulputate tellus ac facilisis. Quisque sed dolor egestas ante
        gravida semper. Vivamus cursus posuere est et hendrerit. Class aptent
        taciti sociosqu ad litora torquent per conubia nostra, per inceptos
        himenaeos. Maecenas fermentum sem vitae porttitor pretium. Nunc in diam
        maximus, consectetur turpis eget, egestas velit. Suspendisse dapibus
        faucibus risus quis fermentum. Curabitur porttitor sagittis nisl, eget
        egestas ligula porttitor vel. Curabitur sed est feugiat, vestibulum urna
        ac, cursus enim. Duis quis pretium purus. Ut eget metus vel lacus
        sollicitudin tincidunt eu at libero. Ut malesuada nibh id felis
        ullamcorper, eu pellentesque lorem vestibulum. Integer fringilla ante
        odio, vitae viverra ipsum rutrum non. Etiam elit ex, ultricies sed
        dictum non, blandit eget eros. Nam rutrum, dolor vel ullamcorper
        accumsan, mauris massa porta nisl, in dapibus nisi enim non massa. Sed
        in lorem velit. Quisque dolor orci, dapibus et consectetur at, ultricies
        eget felis. Pellentesque blandit leo nec magna dapibus aliquam. Praesent
        efficitur elementum nisi, eu vehicula nibh hendrerit convallis. Etiam
        nec leo sapien. Vivamus rhoncus pulvinar mauris porta pulvinar. Integer
        velit enim, dapibus a sapien sed, pellentesque ultrices leo. Nullam eu
        orci ac est mattis elementum eu et tortor. Sed egestas, dolor in
        fermentum bibendum, mauris justo rhoncus lorem, ut condimentum leo
        lectus nec dolor. Nam vitae risus mauris. Praesent porttitor ligula at
        consectetur commodo. Morbi iaculis sem a leo lobortis maximus. Curabitur
        eu tortor enim. Nam est enim, faucibus at pellentesque nec, lacinia ut
        ipsum. Donec id ullamcorper dolor. Morbi pretium pulvinar enim, et porta
        sapien faucibus id. Nullam condimentum venenatis ante sit amet maximus.
        Sed porttitor imperdiet sapien a eleifend. Integer eget ligula non elit
        suscipit sagittis ut sed ipsum. Morbi mattis, nisl non congue gravida,
        turpis arcu fermentum lacus, non commodo tellus lorem vitae velit.
        Vivamus quis leo porttitor magna accumsan vestibulum lacinia at orci.
        Phasellus malesuada lorem fermentum pharetra laoreet. Aenean iaculis ac
        tortor a facilisis. Praesent ante massa, ornare non mauris sit amet,
        pretium feugiat lorem. Praesent eu arcu quis risus congue pulvinar.
        Maecenas non nunc dui. Ut ac mauris odio. Nullam feugiat vitae arcu a
        imperdiet. In interdum erat a justo tristique ultricies. Integer in
        tellus non enim auctor aliquet blandit sit amet dolor. Phasellus
        vulputate diam nec elit luctus, et porta mauris sodales. Ut a tellus non
        sem maximus congue. Vivamus quis fringilla risus, quis gravida erat.
        Fusce lobortis lacinia tortor vitae malesuada. Mauris dictum enim
        rutrum, fringilla nisi vitae, mattis felis. Mauris pretium urna sed dui
        interdum consequat.
      </p>
    </div>
  );
};

export default TermsConditions;
