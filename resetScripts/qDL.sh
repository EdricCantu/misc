#!/usr/bin/env bash

#wget dpkg tar

#set up .desktop files
# idk




#sudo /mnt/chromeos/MyFiles/edede/qDL.sh
if [ "$EUID" -ne 0 ]; then
  echo "Try again, but run as root."
  exit
fi
cd /
mkdir -p /uBin/path
touch /uBin/exec/
mkdir -p /uBin/exec
echo -en '\nexport PATH="$PATH":/uBin/path' >> ~/.bashrc
echo 'added uBin to path'
echo 'making add'
        touch /uBin/path/addArchiveDL
        chmod +x $_
        echo -en '#!/usr/bin/env bash\n#format ( url remove-roots devName appName appVers executable name)\ntemp=$(mktemp)\nmkdir -p /uBin/bin/$3/$4/$5\ncd $_\nwget -O $temp $1 #download $1 and send it to $temp\ntar xvf $temp --strip-components=$2 #extract $temp to $dir and strip $2 roots\nrm $temp\nchmod +x $6\ncd ../../../..\nln -s /uBin/bin/$3/$4/$5/$6 $7' > $_
        touch /uBin/path/addArchive
        chmod +x $_
        echo -en '#!/usr/bin/env bash\n#format ( archive remove-roots devName appName appVers executable name)\nmkdir -p /uBin/bin/$3/$4/$5\ncd $_\ntar xvf $1 --strip-components=$2 #extract $temp to $dir and strip $2 roots\nchmod +x $6\ncd ../../../..\nln -s /uBin/bin/$3/$4/$5/$6 $7' > $_
        touch /uBin/path/addInterpret
        chmod +x $_
        echo -en '#!/usr/bin/env bash\n#format ( file run devName appName appVers)'> $_


#!/usr/bin/env bash
#format( file run devName appName appVers)


addURL(){
  #format ( url remove-roots devName appName appVers executable name)
  echo 'creating temporary file'
  temp=$(mktemp)
  mkdir -p /uBin/bin/$3/$4/$5
  cd $_
  echo 'downloading binaries for '
  wget -O $temp $1 #download $1 and send it to $temp
  echo 'extracting archive'
  tar xvf $temp --strip-components=$2 #extract $temp to $dir and strip $2 roots
  chmod +x $6
  cd ../../../..
  echo 'Creating symlink to binary'
  ln -s /uBin/bin/$3/$4/$5/$6 $7
  rm $temp
}
