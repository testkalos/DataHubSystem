package fr.gael.dhus.api.stub.stub_share.exceptions;

public class RequiredFieldMissingException extends Exception
{
   private static final long serialVersionUID = 6984576755705267038L;

   public RequiredFieldMissingException (String msg)
   {
      super (msg);
   }

}
