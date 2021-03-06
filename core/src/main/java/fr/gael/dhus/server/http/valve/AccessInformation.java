/*
 * Data Hub Service (DHuS) - For Space data distribution.
 * Copyright (C) 2013,2014,2015 GAEL Systems
 *
 * This file is part of DHuS software sources.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */

package fr.gael.dhus.server.http.valve;

import java.util.Date;


/**
 * Class defining the access information.
 */
public class AccessInformation implements Comparable<AccessInformation>
{
   String remoteAddress;
   String remoteHost;
   String localAddress;
   String localHost;
   String username;
   String request;
   Long startTimestamp;
   Long endTimestamp;
   Date startDate;
   
   public String getRemoteAddress()
   {
      return remoteAddress;
   }
   public void setRemoteAddress(String remote)
   {
      this.remoteAddress = remote;
   }
   public String getLocalAddress()
   {
      return localAddress;
   }
   public void setLocalAddress(String local)
   {
      this.localAddress = local;
   }
   
   public String getRemoteHost ()
   {
      return remoteHost;
   }
   public void setRemoteHost(String remote)
   {
      this.remoteHost = remote;
   }
   public String getLocalHost()
   {
      return localHost;
   }
   public void setLocalHost(String local)
   {
      this.localHost = local;
   }

   public String getUsername()
   {
      return username;
   }
   public void setUsername(String username)
   {
      this.username = username;
   }
   public String getRequest()
   {
      return request;
   }
   public void setRequest(String request)
   {
      this.request = request;
   }
   public Long getStartTimestamp()
   {
      return startTimestamp;
   }
   public void setStartTimestamp (Long timestamp)
   {
      this.startTimestamp = timestamp;
   }
   
   public Long getEndTimestamp()
   {
      return endTimestamp;
   }
   public void setEndTimestamp (Long timestamp)
   {
      this.endTimestamp = timestamp;
   }
   
   public Date getStartDate ()
   {
      return startDate;
   }
   public void setStartDate (Date start)
   {
      this.startDate = start;
   }

   @Override
   public String toString()
   {
      String date = "[" + AccessValve.twoDigit(getDurationMs ()) + "ms]";
      String username = this.getUsername()==null?"-":this.getUsername();
      String remote = this.getRemoteAddress()==null?"-":this.getRemoteAddress();
      String request= this.getRequest()==null?"-":this.getRequest();

      return date + " " + username + " (" + remote + ") " + request;
   }

   /**
    * Computes the delay between timestamp end and start. 
    * @return the delay in milliseconds.
    */
   public double getDurationMs ()
   {
      return getDurationNs ()/1000000.0;
   }

   /**
    * Computes the delay between timestamp end and start. 
    * @return the delay in nanoseconds.
    */
   public long getDurationNs ()
   {
      Long start = this.getStartTimestamp();
      Long end = this.getEndTimestamp();
      // Case of information not already set.
      if ((end == null) || (start == null))
         return 0L;
      long duration=(end-start);
      return duration;
   }

   
   @Override
   public int compareTo(AccessInformation ai)
   {
      return getStartTimestamp().compareTo(ai.getStartTimestamp());
   }
   
   public int size ()
   {
      int size =
         // endTimestamp
         (Long.SIZE/8) +
         // startTimestamp
         (Long.SIZE/8) +
         // localAddress
         ((localAddress==null)?0:localAddress.length()) +
         ((localHost==null)?0:localHost.length()) +
         ((remoteAddress==null)?0:remoteAddress.length()) +
         ((remoteHost==null)?0:remoteHost.length()) +
         ((request==null)?0:request.length()) +
         ((username==null)?0:username.length());
      return size;
         
   }
}
